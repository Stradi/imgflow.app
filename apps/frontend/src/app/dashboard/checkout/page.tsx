'use client';

import { doAuthenticatedRequest } from '@/services/auth';
import { Loader2Icon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const variant = searchParams.get('variant');
    if (!variant) {
      setError('Hey, looks like this link is broken. You can go back to dashboard and try again.');
      return;
    }

    async function getCheckoutUrl() {
      doAuthenticatedRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          product: 'subscription',
          variant,
        }),
      })
        .then((data) => {
          router.push(data.url);
        })
        .catch((e) => {
          setError('Hey, looks like this link is broken. You can go back to dashboard and try again.');
        });
    }

    getCheckoutUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-gray-800">
      {!error && <Loader2Icon className="mb-4 animate-spin text-4xl" />}
      {error ? <p>{error}</p> : <p>Redirecting to checkout page, please wait...</p>}
    </div>
  );
};

export default Page;
