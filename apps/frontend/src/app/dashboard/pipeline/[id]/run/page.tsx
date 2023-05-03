'use client';

import ImageDropzone from '@/components/pipeline/ImageDropzone';
import UploadedImagesPreview from '@/components/pipeline/UploadedImagesPreview/UploadedImagesPreview';
import { Button } from '@/components/ui/Button';
import { getJobStatus, getPipelineById, runPipeline } from '@/services/pipeline';
import usePipelineRun from '@/stores/PipelineRunStore';
import { useEffect } from 'react';

const Page = ({
  params: { id: pipelineId },
}: {
  params: {
    id: string;
  };
}) => {
  const { images, setImages, pipeline, setPipeline, isFinished, setIsFinished } = usePipelineRun((state) => ({
    images: state.images,
    setImages: state.setImages,
    pipeline: state.pipeline,
    setPipeline: state.setPipeline,
    isFinished: state.isFinished,
    setIsFinished: state.setIsFinished,
  }));

  useEffect(() => {
    async function fetchPipeline() {
      // TODO: add error handling here, eg. `const response = await getPipelineById(pipelineId).catch(...)`
      const response = await getPipelineById(pipelineId);
      setPipeline(response['data']);
    }

    fetchPipeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function apiRunPipeline() {
    setIsFinished(false);

    const {
      data: { id: jobId },
    } = await runPipeline(pipeline.id, images);
    // TODO: Fix this. Find a way to do this elegantly while showing progress to user.
    const intervalId = setInterval(async () => {
      const status = await getJobStatus(jobId);
      console.log(status);

      if (status.data.state === 'completed') {
        setIsFinished(true);
        clearInterval(intervalId);
      }
    }, 1000);
  }

  return (
    <div className="p-4">
      <div className="mb-4">
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
              <Button size="lg" onClick={() => apiRunPipeline()}>
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
    </div>
  );
};

export default Page;
