'use client';

import { ChevronsRightIcon } from 'lucide-react';

const STEP_TO_VIDEO_URL: Record<number, string> = {
  0: '/assets/create-a-account.mp4',
  1: '/assets/create-a-pipeline.mp4',
  2: '/assets/edit-the-pipeline.mp4',
  3: '/assets/run-the-pipeline.mp4',
};

export default function HowItWorks() {
  return (
    <div className="space-y-8 pt-8" id="how-it-works">
      <div>
        <p className="text-4xl font-medium text-center">How It Works?</p>
        <p className="text-xl font-medium text-center text-gray-600">in just three steps</p>
      </div>
      <div className="space-y-8">
        <StepNumber title="1. Create a Pipeline" videoSrc="/assets/create-a-pipeline.mp4">
          <p>Simple enough. Create a pipeline with a name. Optionally you can select a template to start with.</p>
          <p>After creating, you will be redirected to a page where you can edit your pipeline.</p>
        </StepNumber>
        <StepNumber title="2. Edit the Pipeline" videoSrc="/assets/edit-the-pipeline.mp4">
          <p>You can add, edit or remove steps (nodes) from your pipeline. Connect the nodes to create a flow.</p>
          <p>
            Some nodes have settings that you can configure. When you are done, click on the save button at the top to
            save your changes.
          </p>
        </StepNumber>
        <StepNumber title="3. Run the Pipeline" videoSrc="/assets/run-the-pipeline.mp4">
          <p>
            To run the pipeline, save your work and choose either the &quot;Run This Pipeline&quot; button or go to the
            dashboard and click the &quot;Run&quot; button for the desired pipeline.
          </p>
          <p>
            Then, drag and drop the files into the dropzone and click the &quot;Run Pipeline&quot; button. Once the job
            for the images is created, wait for it to finish, and then click the &quot;View Images&quot; button to
            download your files.
          </p>
        </StepNumber>
      </div>
    </div>
  );
}

type TStepNumberProps = {
  title: string;
  videoSrc: string;
  children?: React.ReactNode;
};
function StepNumber({ title, videoSrc, children }: TStepNumberProps) {
  return (
    <div className="md:grid md:grid-cols-6 gap-4 items-center space-y-4 md:space-y-0 group">
      <div className="col-span-2 space-y-4">
        <div className="relative text-2xl font-bold text-gray-800">
          <div className="opacity-0 absolute inset-0 group-hover:opacity-100 top-1/2 -translate-y-1/2 -translate-x-6 group-hover:translate-x-0 transition-[transform,opacity] duration-200">
            <ChevronsRightIcon className="w-5 h-5 text-gray-400" />
          </div>
          <p className="group-hover:translate-x-6 transition-[transform,color] duration-200 text-gray-600 group-hover:text-gray-800">
            {title}
          </p>
        </div>
        <div className="font-medium text-gray-500 group-hover:text-gray-600 space-y-2 transition-[color] duration-200">
          {children}
        </div>
      </div>
      <div className="col-span-4 flex justify-center">
        <video
          className="w-full aspect-video border-2 border-gray-200 rounded-[32px] md:rounded-[64px] group-hover:shadow-lg group-hover:rounded-[32px] transition-[border-radius,shadow] duration-200"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  );
}
