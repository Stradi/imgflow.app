'use client';

import PricingPlans from '@/components/subscription/PricingPlans';
import { doAuthenticatedRequest } from '@/services/auth';
import { useEffect, useState } from 'react';

const Page = () => {
  const [currentSubscriptionPlan, setCurrentSubscriptionPlan] = useState<null | string>(null);

  useEffect(() => {
    function fetchSubscription() {
      doAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/subscription`, {
        method: 'GET',
      })
        .then((response) => {
          if (response.data !== null) {
            setCurrentSubscriptionPlan(response.data.variant);
          } else {
            setCurrentSubscriptionPlan(null);
          }
        })
        .catch((error) => {
          setCurrentSubscriptionPlan(null);
          console.log(error);
        });
    }

    fetchSubscription();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-2 py-4 space-y-4">
      <h1 className="text-2xl font-medium">Manage Subscription</h1>
      <PricingPlans currentPlan={currentSubscriptionPlan} />
    </div>
  );
};

export default Page;
