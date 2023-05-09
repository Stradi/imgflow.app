'use client';

import CreatePipelineModalContent from '@/components/pipeline/CreatePipelineModalContent';
import PipelineCard, { EmptyPipelineCard } from '@/components/pipeline/PipelineCard';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogTrigger } from '@/components/ui/Dialog';
import { createNewPipeline, deletePipeline, getAllPipelines } from '@/services/pipeline';
import { toRelativeDate } from '@/utils/date';
import TEMPLATE_TO_PIPELINE from '@/utils/templateToPipeline';
import { useEffect, useState } from 'react';

const Page = () => {
  const [_, forceUpdate] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pipelines, setPipelines] = useState([]);

  useEffect(() => {
    async function fetchPipelines() {
      const response = await getAllPipelines();
      setPipelines(response.data.sort((a: any, b: any) => b.id - a.id));
    }

    fetchPipelines();
  }, [_]);

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-medium">My Pipelines</h1>
      </div>
      {pipelines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger>
              <EmptyPipelineCard />
            </DialogTrigger>
            <CreatePipelineModalContent
              onCreate={async (pipelineName, template) => {
                const dataJson = JSON.stringify(TEMPLATE_TO_PIPELINE[template as keyof typeof TEMPLATE_TO_PIPELINE]);
                await createNewPipeline(pipelineName, dataJson).catch((err) => {
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
              href={`/dashboard/pipeline/${pipeline.id}`}
              title={pipeline.name}
              lastRun={pipeline.lastRun ? toRelativeDate(pipeline.lastRun) : 'Never'}
              runCount={pipeline.runCount}
              processedImageCount={pipeline.processedImageCount}
              image="https://picsum.photos/1024/256"
              onDelete={async () => {
                await deletePipeline(pipeline.id).catch((err) => {
                  console.error(err);
                });
                forceUpdate((x) => x + 1);
              }}
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
                const dataJson = JSON.stringify(TEMPLATE_TO_PIPELINE[template as keyof typeof TEMPLATE_TO_PIPELINE]);
                await createNewPipeline(pipelineName, dataJson).catch((err) => {
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
