import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../lib/db';
import authMiddleware from '../middlewares/auth';
import {
  PRODUCT_TO_ID,
  SUBSCRIPTION_VARIANT_TO_CREDITS,
  SUBSCRIPTION_VARIANT_TO_DESCRIPTION,
  SUBSCRIPTION_VARIANT_TO_ID,
  SUBSCRIPTION_VARIANT_TO_READABLE,
} from '../utils/checkout';
import {
  getConcurrentJobLimitForSubscription,
  getCreditCountForSubscription,
  getPipelineLimitForSubscription,
} from '../utils/subscription';

const router = express.Router();

router.post('/create-account', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      error: 'Invalid body',
    });
  }

  const isExists = await db().account.findUnique({
    where: {
      email: email,
    },
  });

  if (isExists) {
    return res.json({
      error: 'Email already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await db().account.create({
    data: {
      email: email,
      password: hashedPassword,
      credits: 25,
    },
  });

  const accessToken = jwt.sign({ id: createdUser.id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '7d' });

  return res.json({
    message: 'Account created successfully',
    data: {
      user: {
        id: createdUser.id,
        email: createdUser.email,
      },
      accessToken,
    },
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      error: 'Invalid body',
    });
  }

  const user = await db().account.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.json({
      error: "User doesn't exist",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.json({
      error: 'Invalid password',
    });
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '7d' });

  return res.json({
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken,
    },
  });
});

router.get('/me', authMiddleware, async (req, res) => {
  const user = await db().account.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.json({
      error: "User doesn't exist",
    });
  }

  return res.json({
    message: 'User found',
    data: {
      user: {
        id: user.id,
        email: user.email,
      },
    },
  });
});

router.get('/usage', authMiddleware, async (req, res) => {
  const user = await db().account.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      pipelines: {
        select: {
          id: true,
          name: true,
          runCount: true,
          lastRun: true,
          processedImageCount: true,
        },
      },
    },
  });

  if (!user) {
    return res.json({
      error: "User doesn't exits",
    });
  }

  const jobs = await db().job.findMany({
    where: {
      userId: req.user.id,
      status: {
        in: ['active', 'waiting'],
      },
    },
  });

  return res.json({
    message: 'User found',
    data: {
      pipelines: user.pipelines,
      pipeline: {
        current: user.pipelines.length,
        limit: getPipelineLimitForSubscription(req.user.subscription ? req.user.subscription.variantId : 'free'),
      },
      jobs: {
        current: jobs.length,
        limit: getConcurrentJobLimitForSubscription(req.user.subscription ? req.user.subscription.variantId : 'free'),
      },
      credits: {
        current: user.credits,
        limit: getCreditCountForSubscription(req.user.subscription ? req.user.subscription.variantId : 'free'),
      },
    },
  });
});

router.get('/credits', authMiddleware, async (req, res) => {
  const user = await db().account.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.json({
      error: "User doesn't exits",
    });
  }

  return res.json({
    message: 'User found',
    data: {
      credits: user.credits,
    },
  });
});

router.post('/checkout', authMiddleware, async (req, res) => {
  const { product, variant } = req.body;
  if (
    !req.body ||
    !product ||
    !variant ||
    !Object.keys(PRODUCT_TO_ID).includes(product) || // Invalid Product (not "subscription")
    !Object.keys(SUBSCRIPTION_VARIANT_TO_ID).includes(variant) || // Invalid Variant
    !Object.keys(SUBSCRIPTION_VARIANT_TO_CREDITS).includes(variant)
  ) {
    console.log(req.body);
    return res.json({
      error: 'Invalid body',
    });
  }

  const productId = PRODUCT_TO_ID[req.body.product];
  const variantId = SUBSCRIPTION_VARIANT_TO_ID[req.body.variant];
  const creditCount = SUBSCRIPTION_VARIANT_TO_CREDITS[req.body.variant];

  const user = await db().account.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.json({
      error: "User doesn't exits",
    });
  }

  const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email: user.email,
            custom: {
              userId: user.id.toString(),
              creditCount: creditCount.toString(),
            },
          },
          product_options: {
            enabled_variants: [variantId],
            name: SUBSCRIPTION_VARIANT_TO_READABLE[variant],
            description: SUBSCRIPTION_VARIANT_TO_DESCRIPTION[variant],
          },
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: process.env.LEMONSQUEEZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: 'variants',
              id: variantId,
            },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    console.error(JSON.stringify(await response.json()));
    return res.json({
      error: 'Something went wrong',
    });
  }

  const jsonResponse = await response.json();
  return res.json({
    url: jsonResponse.data.attributes.url,
  });
});

router.get('/subscription', authMiddleware, async (req, res) => {
  const user = await db().account.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.json({
      error: "User doesn't exits",
    });
  }

  const subscription = await db().subscription.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!subscription) {
    return res.json({
      data: null,
    });
  }

  const subscriptionName = Object.keys(SUBSCRIPTION_VARIANT_TO_ID).find(
    (key) => SUBSCRIPTION_VARIANT_TO_ID[key] === subscription.variantId
  );
  if (!subscriptionName) {
    return res.json({
      data: null,
    });
  }

  return res.json({
    data: {
      status: subscription.status,
      billingAnchor: subscription.billingAnchor,
      createdAt: subscription.createdAt,
      endsAt: subscription.endsAt,
      renewsAt: subscription.renewsAt,
      planName: SUBSCRIPTION_VARIANT_TO_READABLE[subscriptionName],
      planDescription: SUBSCRIPTION_VARIANT_TO_DESCRIPTION[subscriptionName],
      creditCount: SUBSCRIPTION_VARIANT_TO_CREDITS[subscriptionName],
      variant: subscriptionName,
    },
  });
});

router.patch('/subscription', authMiddleware, async (req, res) => {
  const { variant, fromVariant } = req.body;
  if (
    !req.body ||
    !variant ||
    !Object.keys(SUBSCRIPTION_VARIANT_TO_ID).includes(variant) ||
    !Object.keys(SUBSCRIPTION_VARIANT_TO_CREDITS).includes(variant) ||
    !fromVariant ||
    !Object.keys(SUBSCRIPTION_VARIANT_TO_ID).includes(fromVariant) ||
    !Object.keys(SUBSCRIPTION_VARIANT_TO_CREDITS).includes(fromVariant)
  ) {
    return res.json({
      error: 'Invalid body',
    });
  }

  const variantId = SUBSCRIPTION_VARIANT_TO_ID[variant];
  const creditCount = SUBSCRIPTION_VARIANT_TO_CREDITS[variant];
  const fromCreditCount = SUBSCRIPTION_VARIANT_TO_CREDITS[fromVariant];
  const creditDifference = creditCount - fromCreditCount;

  const user = await db().account.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.json({
      error: "User doesn't exists",
    });
  }

  const subscription = await db().subscription.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!subscription) {
    return res.json({
      error: "User isn't subscribed to any plan",
    });
  }

  const response = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${subscription.subscriptionId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: 'subscriptions',
        id: subscription.subscriptionId,
        attributes: {
          product_id: PRODUCT_TO_ID['subscription'],
          variant_id: variantId,
        },
      },
    }),
  });

  if (!response.ok) {
    console.error(JSON.stringify(await response.json()));
    return res.json({
      error: 'Something went wrong',
    });
  }

  const jsonResponse = await response.json();

  await db().subscription.update({
    where: {
      id: subscription.id,
    },
    data: {
      customerId: jsonResponse.data.attributes.customer_id.toString(),
      orderId: jsonResponse.data.attributes.order_id.toString(),
      productId: jsonResponse.data.attributes.product_id.toString(),
      variantId: jsonResponse.data.attributes.variant_id.toString(),
      subscriptionId: jsonResponse.data.id.toString(),

      status: jsonResponse.data.attributes.status,
      cardBrand: jsonResponse.data.attributes.card_brand,
      cardLastFour: jsonResponse.data.attributes.card_last_four,
      billingAnchor: jsonResponse.data.attributes.billing_anchor.toString(),
      updatePaymentUrl: jsonResponse.data.attributes.urls.update_payment_method,

      endsAt: new Date(jsonResponse.data.attributes.ends_at),
      renewsAt: new Date(jsonResponse.data.attributes.renews_at),
    },
  });

  await db().account.update({
    where: {
      id: user.id,
    },
    data: {
      credits: {
        increment: creditDifference,
      },
    },
  });

  // If user's new plan has more pipelines limit than the old one, do nothing
  // variant >= fromVariant ? doNothing : deleteNAmountOfPipelines
  const pipelineCountDifference =
    getPipelineLimitForSubscription(variant) - getPipelineLimitForSubscription(fromVariant);
  console.log(variant, fromVariant, pipelineCountDifference);
  if (pipelineCountDifference < 0) {
    // Delete N amount of pipelines where N is the difference between the new and old plan pipeline limit
    const pipelines = await db().pipeline.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const pipelineIdsToDelete = pipelines
      .slice(getPipelineLimitForSubscription(variant))
      .map((pipeline) => pipeline.id);
    await db().pipeline.deleteMany({
      where: {
        id: {
          in: pipelineIdsToDelete,
        },
      },
    });
  }

  return res.json({
    data: {
      success: true,
    },
  });
});

router.delete('/subscription', authMiddleware, async (req, res) => {
  const user = await db().account.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.json({
      error: "User doesn't exists",
    });
  }

  const subscription = await db().subscription.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!subscription) {
    return res.json({
      error: "User isn't subscribed to any plan",
    });
  }

  const response = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${subscription.subscriptionId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
    },
  });

  if (!response.ok) {
    console.error(JSON.stringify(await response.json()));
    return res.json({
      error: 'Something went wrong',
    });
  }

  await db().subscription.delete({
    where: {
      id: subscription.id,
    },
  });

  // Delete all the pipelines except the last one
  const pipelines = await db().pipeline.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (pipelines.length > 1) {
    await db().pipeline.deleteMany({
      where: {
        id: {
          in: pipelines.slice(1).map((pipeline) => pipeline.id),
        },
      },
    });
  }

  return res.json({
    data: {
      success: true,
    },
  });
});

export default router;
