'use client';

import ImageDropzone from '@/components/pipeline/ImageDropzone';
import JobImagesModal from '@/components/pipeline/JobImagesModal';
import JobTable from '@/components/pipeline/JobTable';
import UploadedImagesPreview from '@/components/pipeline/UploadedImagesPreview/UploadedImagesPreview';
import { Button } from '@/components/ui/Button';
import { getAllJobs } from '@/services/job';
import { getPipelineById, runPipeline } from '@/services/pipeline';
import useJobStore from '@/stores/JobStore';
import usePipelineRun from '@/stores/PipelineRunStore';
import { relativeTimeBetweenTwoDates, toRelativeDate } from '@/utils/date';
import { useEffect, useState } from 'react';

const Page = ({
  params: { id: pipelineId },
}: {
  params: {
    id: string;
  };
}) => {
  const [isStarted, setIsStarted] = useState(false);

  const { images, setImages, pipeline, setPipeline } = usePipelineRun((state) => ({
    images: state.images,
    setImages: state.setImages,
    pipeline: state.pipeline,
    setPipeline: state.setPipeline,
  }));

  const { addJob, setJobs } = useJobStore((state) => ({
    addJob: state.addJob,
    setJobs: state.setJobs,
  }));

  useEffect(() => {
    async function fetchPipeline() {
      // TODO: add error handling here, eg. `const response = await getPipelineById(pipelineId).catch(...)`
      const response = await getPipelineById(pipelineId);
      setPipeline(response['data']);
    }

    async function fetchAllJobs() {
      const response = await getAllJobs(pipelineId);
      setJobs(
        response['data'].map((job: any) => ({
          id: job['id'],
          status: job['status'],
          imageCount: job['imageCount'],
          progress: `${job['progress']}%`,
          createdAt: toRelativeDate(job['createdAt']),
          duration: job['finishedAt']
            ? relativeTimeBetweenTwoDates(new Date(job['createdAt']), new Date(job['finishedAt']))
            : relativeTimeBetweenTwoDates(new Date(job['createdAt']), new Date()),
          actions: job['status'] === 'completed' ? <JobImagesModal job={job} /> : <p>No actions available</p>,
        }))
      );
    }

    fetchPipeline();
    fetchAllJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function apiRunPipeline() {
    setIsStarted(true);
    const response = await runPipeline(pipeline.id, images);
    setImages([]);

    addJob({
      id: response['data']['id'],
      status: 'waiting',
      imageCount: response['data']['imageCount'],
      progress: `${response['data']['progress']}%`,
      createdAt: toRelativeDate(response['data']['createdAt']),
      duration: response['data']['finishedAt']
        ? relativeTimeBetweenTwoDates(new Date(response['data']['createdAt']), new Date(response['data']['finishedAt']))
        : relativeTimeBetweenTwoDates(new Date(response['data']['createdAt']), new Date()),
      actions:
        response['data']['status'] === 'completed' ? (
          <JobImagesModal job={response['data']} />
        ) : (
          <p>No actions available</p>
        ),
    });
    setIsStarted(false);
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-medium">Run &apos;{(pipeline && pipeline.name && pipeline.name) || ''}&apos;</h1>
      </div>
      <div className="grid lg:grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <ImageDropzone
            onDrop={(files) => {
              // Remove duplicates
              const allImages = [...images, ...files];
              const uniqueImages = allImages.filter(
                (image, index) => allImages.findIndex((img) => img.name === image.name) === index
              );
              setImages(uniqueImages);
            }}
          />
          {images.length > 0 && (
            <div className="bg-gray-50 p-4 h-full flex flex-col gap-2 items-center justify-center rounded-lg">
              <Button size="lg" onClick={() => apiRunPipeline()} disabled={images.length > 0 && isStarted}>
                Run Pipeline
              </Button>
              <p className="text-gray-500">
                {/* TODO: Add real approx. time here */}
                Will process {images.length} images. The process will take approximately 5 minutes.
              </p>
            </div>
          )}
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <UploadedImagesPreview
            images={images}
            onDiscardImage={(files) => {
              setImages(images.filter((image) => !files.includes(image)));
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-medium">Jobs</h2>
        <JobTable />
      </div>
    </div>
  );
};

export default Page;
