'use client';

import UsageCard from '@/components/usage/UsageCard';
import { getUsage } from '@/services/auth';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usage, setUsage] = useState({});

  useEffect(() => {
    async function fetchUsage() {
      const response = await getUsage();

      setUsage(response);
      setIsLoading(false);
    }

    setIsLoading(true);
    fetchUsage();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-gray-800">
        <Loader2Icon className="mb-4 animate-spin text-4xl" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-2 py-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-medium">Usage</h1>
      <p>{JSON.stringify(usage)}</p>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        <UsageCard
          title="Test"
          description="This is the test description. It can be long and span multiple lines."
          usage={{
            current: 50,
            max: 100,
          }}
        />
      </div>
    </div>
  );
};

export default Page;
