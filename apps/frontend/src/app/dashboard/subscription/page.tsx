'use client';

import { Button } from '@/components/ui/Button';
import { doAuthenticatedRequest } from '@/services/auth';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      <h1 className="text-2xl font-medium">Manage Subscription</h1>
      <Button
        onClick={async () => {
          const response = await doAuthenticatedRequest('http://localhost:3001/api/v1/account/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              product: 'subscription',
              variant: 'basic-500',
            }),
          });

          const checkoutUrl = response.url;
          router.push(checkoutUrl);
        }}
      >
        Subscribe Test
      </Button>
    </div>
  );
};

export default Page;
