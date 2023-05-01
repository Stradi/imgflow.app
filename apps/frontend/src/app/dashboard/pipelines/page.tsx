'use client';

import { Button } from '@/components/ui/Button';
import { getAllPipelines } from '@/services/pipeline';
import { useEffect, useState } from 'react';

const Page = () => {
  const [pipelines, setPipelines] = useState([]);

  useEffect(() => {
    async function doFetch() {
      const response = await getAllPipelines();
      setPipelines(response.data);
    }

    doFetch();
  }, []);
  return (
    <div>
      <h1>Pipelines</h1>
      {pipelines.length === 0 ? (
        <div>
          <p>You have no pipelines yet.</p>
          <Button onClick={() => {}}>Let&apos;s Create One</Button>
        </div>
      ) : (
        <ul>
          {pipelines.map((pipeline: any) => (
            <li key={pipeline.id}>
              <a href={`/dashboard/pipeline/${pipeline.id}`}>{pipeline.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
