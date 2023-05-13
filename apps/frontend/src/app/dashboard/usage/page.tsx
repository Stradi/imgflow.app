'use client';

import PipelineCard from '@/components/pipeline/PipelineCard';
import CreditCount from '@/components/usage/CreditCount';
import SubscriptionInfo from '@/components/usage/SubscriptionInfo';
import UsageCard from '@/components/usage/UsageCard';
import { getUsage } from '@/services/auth';
import { toRelativeDate } from '@/utils/date';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usage, setUsage] = useState<any>({});

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
    <div className="px-2 py-4 max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-medium">Usage</h1>
      <CreditCount count={usage.credits.current} />
      <SubscriptionInfo />
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <UsageCard
          title="Pipelines"
          description="How many active pipelines you have in your account."
          usage={{
            current: usage.pipeline.current,
            max: usage.pipeline.limit,
          }}
        />
        <UsageCard
          title="Concurrent Jobs"
          description="How many concurrent jobs you can run at the same time."
          usage={{
            current: usage.jobs.current,
            max: usage.jobs.limit,
          }}
        />
        <UsageCard
          title="Credit Count"
          description="How many credits you have in your account."
          usage={{
            current: usage.credits.current,
            max: -1,
          }}
        />
      </div>
      <div className="space-y-4 !mt-8">
        <h2 className="text-xl font-medium">Most Ran Pipelines</h2>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {usage.pipelines.map((pipeline: any) => (
            <PipelineCard
              key={pipeline.id}
              title={pipeline.name}
              hideButtons
              {...pipeline}
              lastRun={pipeline.lastRun ? toRelativeDate(pipeline.lastRun) : 'Never'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
