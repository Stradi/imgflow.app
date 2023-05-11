import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../lib/db';
import authMiddleware from '../middlewares/auth';

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

  return res.json({
    message: 'User found',
    data: {
      credits: user.credits,
      totalImagesProcessed: user.totalImagesProcessed,
      totalProcessDuration: user.totalProcessDuration,
      monthlyImagesProcessed: user.monthlyImagesProcessed,
      monthlyProcessDuration: user.monthlyProcessDuration,
      pipelines: user.pipelines,
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
  if (!req.body || !req.body.amount) {
    return res.json({
      error: 'Invalid body',
    });
  }

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
          },
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: '',
            },
          },
          variant: {
            data: {
              type: 'variants',
              id: '',
            },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    return res.json({
      error: 'Something went wrong',
    });
  }

  const jsonResponse = await response.json();
  return res.json({
    url: jsonResponse.data.attributes.url,
  });
});

export default router;
