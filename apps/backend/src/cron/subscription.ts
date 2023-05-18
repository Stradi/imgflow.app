import { db } from '../lib/db';
import { getCreditCountForSubscription } from '../utils/subscription';

export async function updateAccountCredits() {
  const renewableSubscriptions = await db().subscription.findMany({
    where: {
      renewsAt: {
        lte: new Date(),
      },
    },
  });

  const accounts = await db().account.findMany({
    where: {
      subscription: {
        id: {
          in: renewableSubscriptions.map((subscription) => subscription.id),
        },
      },
    },
    include: {
      subscription: {
        select: {
          variantId: true,
        },
      },
    },
  });

  const successAccounts = [];
  for (const account of accounts) {
    if (!account.subscription) {
      continue;
    }

    await db().account.update({
      where: {
        id: account.id,
      },
      data: {
        credits: {
          increment: getCreditCountForSubscription(account.subscription.variantId),
        },
      },
    });

    successAccounts.push(account);
  }

  return successAccounts;
}
