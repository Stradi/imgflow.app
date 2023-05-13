'use client';

import { doAuthenticatedRequest } from '@/services/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';

export default function SubscriptionInfo() {
  const [info, setInfo] = useState<any>({});

  useEffect(() => {
    async function fetchSubscriptionInfo() {
      const response = await doAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/subscription`, {
        method: 'GET',
      });

      setInfo(response.data);
    }

    fetchSubscriptionInfo();
  }, []);

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row justify-between gap-2 md:items-center">
      <p className="text-lg md:text-xl">
        {!info ? "You don't have an active subscription." : `You have an active ${info.planName} subscription.`}
      </p>
      <Link href="/dashboard/settings" passHref>
        <Button variant="outline" className="w-full md:w-auto">
          Manage Subscription
        </Button>
      </Link>
    </div>
  );
}
