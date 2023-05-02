'use client';

import { getPipelineById } from '@/services/pipeline';
import Link from 'next/link';
import { PropsWithChildren, useEffect, useState } from 'react';

type TLayoutProps = PropsWithChildren<{
  params: {
    id: string;
  };
}>;

const Layout = ({ children, params: { id } }: TLayoutProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const [pipeline, setPipeline] = useState<any | null>(null);

  useEffect(() => {
    async function fetchPipeline() {
      setIsFetching(true);
      try {
        const response = await getPipelineById(id);
        setPipeline(response['data']);
      } catch (e) {
        console.log(e);
        setPipeline(null);
      } finally {
        setIsFetching(false);
      }
    }

    fetchPipeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return (
      <div className="p-4 space-y-4">
        <div className="text-2xl">Loading pipeline...</div>
      </div>
    );
  } else {
    if (pipeline === null) {
      return (
        <div className="p-4 space-y-4">
          <div className="text-2xl">
            Well, something happened. Either this pipeline <span className="font-medium">doesn&apos;t exists</span>, or{' '}
            <span className="font-medium">you don&apos;t have access</span> to it.
          </div>
          <div className="text-2xl">
            You can try to{' '}
            <Link href="/dashboard" className="underline font-medium hover:text-gray-600">
              go back to dashboard
            </Link>{' '}
            and try to create a new pipeline.
          </div>
        </div>
      );
    } else {
      return <>{children}</>;
    }
  }
};

export default Layout;
