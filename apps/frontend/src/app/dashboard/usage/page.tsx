'use client';

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
    <div>
      <h1>Usage</h1>
      <p>{JSON.stringify(usage)}</p>
    </div>
  );
};

export default Page;
