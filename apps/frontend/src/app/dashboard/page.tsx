'use client';

import CreatePipelineModalContent from '@/components/pipeline/CreatePipelineModalContent';
import PipelineCard, { EmptyPipelineCard } from '@/components/pipeline/PipelineCard';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogTrigger } from '@/components/ui/Dialog';
import { createNewPipeline, getAllPipelines } from '@/services/pipeline';
import { useEffect, useState } from 'react';

const Page = () => {
  const [_, forceUpdate] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pipelines, setPipelines] = useState([]);

  useEffect(() => {
    async function fetchPipelines() {
      const response = await getAllPipelines();
      setPipelines(response.data);
    }

    fetchPipelines();
  }, [_]);

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-medium">My Pipelines</h1>
      </div>
      {pipelines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger>
              <EmptyPipelineCard />
            </DialogTrigger>
            <CreatePipelineModalContent
              onCreate={async (pipelineName, template) => {
                // TODO: We should add TEMPLATE_TO_DATA constant in src/services/pipeline.ts file
                // and convert template to data here and send to createNewPipeline function.
                await createNewPipeline(pipelineName, template).catch((err) => {
                  console.error(err);
                  setIsModalOpen(false);
                });

                setIsModalOpen(false);
                forceUpdate((x) => x + 1);
              }}
            />
          </Dialog>
          {pipelines.map((pipeline: any) => (
            <PipelineCard
              key={pipeline.id}
              title={pipeline.name}
              lastRun={new Date(Date.now())}
              runCount={200}
              processedImageCount={1000}
              image="https://picsum.photos/1024/256"
            />
          ))}
        </div>
      ) : (
        <div className="text-center space-y-4 overflow-hidden relative bg-gray-50 rounded-lg p-16 border border-gray-200">
          <h2 className="text-4xl">You have no pipelines.</h2>
          <p>
            <span className="text-2xl text-gray-600">Create a pipeline to get started.</span>
          </p>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>Create a Pipeline</Button>
            </DialogTrigger>
            <CreatePipelineModalContent
              onCreate={async (pipelineName, template) => {
                // TODO: We should add TEMPLATE_TO_DATA constant in src/services/pipeline.ts file
                // and convert template to data here and send to createNewPipeline function.
                await createNewPipeline(pipelineName, template).catch((err) => {
                  console.error(err);
                  setIsModalOpen(false);
                });

                setIsModalOpen(false);
                forceUpdate((x) => x + 1);
              }}
            />
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Page;
