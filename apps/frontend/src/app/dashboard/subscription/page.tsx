'use client';

import PricingPlans from '@/components/subscription/PricingPlans';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto px-2 py-4 space-y-4">
      <h1 className="text-2xl font-medium">Manage Subscription</h1>
      <PricingPlans />
    </div>
  );
};

export default Page;
