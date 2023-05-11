import { toRelativeDate } from '@/utils/date';
import Link from 'next/link';
import { Button } from '../ui/Button';

export type TSubscriptionInfoProps = {
  subscription?: {
    plan: string;
    renewsAt: Date;
  };
};

export default function SubscriptionInfo({ subscription }: TSubscriptionInfoProps) {
  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row justify-between gap-2 md:items-center">
      <p className="text-lg md:text-xl">
        {!subscription
          ? "You don't have an active subscription."
          : `You have an active ${subscription.plan} subscription. It will renew ${toRelativeDate(
              subscription.renewsAt
            )}.`}
      </p>
      <Link href="/dashboard/subscription" passHref>
        <Button variant="outline" className="w-full md:w-auto">
          Manage Subscription
        </Button>
      </Link>
    </div>
  );
}
