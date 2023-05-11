import express, { Request } from 'express';
import { db } from '../lib/db';

const router = express.Router();

// This route listens all the webhooks from LemonSqueezy
router.post('/lemonsqueezy', async (req: Request, res) => {
  if (!req.body) {
    return res.status(400).json("Well, I don't know if I can trust you...");
  }

  const eventName = req.body.meta.event_name;

  if (eventName === 'subscription_created') {
    const { userId: _userId, creditCount: _credit } = req.body.meta.custom_data;
    const userId = Number.parseInt(_userId);
    const credit = Number.parseInt(_credit);

    console.log('We have a new user!');
    const user = await db().account.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    await db().account.update({
      where: {
        id: userId,
      },
      data: {
        credits: user.credits + credit,
      },
    });

    const subscription = await db().subscription.create({
      data: {
        userId,
        customerId: req.body.data.attributes.customer_id.toString(),
        orderId: req.body.data.attributes.order_id.toString(),
        productId: req.body.data.attributes.product_id.toString(),
        variantId: req.body.data.attributes.variant_id.toString(),

        status: req.body.data.attributes.status,
        cardBrand: req.body.data.attributes.card_brand,
        cardLastFour: req.body.data.attributes.card_last_four,
        billingAnchor: req.body.data.attributes.billing_anchor.toString(),
        updatePaymentUrl: req.body.data.attributes.urls.update_payment_method,

        createdAt: new Date(req.body.data.attributes.created_at),
        endsAt: new Date(req.body.data.attributes.ends_at),
        renewsAt: new Date(req.body.data.attributes.renews_at),
      },
    });
  }

  return res.status(200).json({ message: 'Well' });
});

export default router;
