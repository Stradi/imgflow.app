'use client';

import { cn } from '@/utils/tw';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const STEP_TO_VIDEO_URL: Record<number, string> = {
  0: '/assets/create-a-account.mp4',
  1: '/assets/create-a-pipeline.mp4',
  2: '/assets/edit-the-pipeline.mp4',
  3: '/assets/run-the-pipeline.mp4',
};

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="space-y-8" id="how-it-works">
      <div>
        <p className="text-4xl font-medium text-center">How It Works?</p>
        <p className="text-xl font-medium text-center text-gray-600">in just four steps</p>
      </div>
      <div className="md:grid md:grid-cols-12 md:gap-2">
        <div className="flex flex-row md:flex-col justify-evenly items-center md:w-full mx-auto w-3/4">
          <StepNumber
            number={1}
            isActive={currentStep === 0}
            description="Create account"
            onClick={() => setCurrentStep(0)}
          />
          <StepNumber
            number={2}
            isActive={currentStep === 1}
            description="Create a pipeline"
            onClick={() => setCurrentStep(1)}
          />
          <StepNumber
            number={3}
            isActive={currentStep === 2}
            description="Edit the pipeline"
            onClick={() => setCurrentStep(2)}
          />
          <StepNumber
            number={4}
            isActive={currentStep === 3}
            description="Run the pipeline"
            onClick={() => setCurrentStep(3)}
          />
        </div>
        <div className="col-span-11 rounded-[32px] overflow-hidden border-2 border-gray-300">
          <div className="bg-gray-200 aspect-video w-full">
            <video
              src={STEP_TO_VIDEO_URL[currentStep]}
              autoPlay
              muted
              onEnded={() => {
                setCurrentStep((currentStep + 1) % 4);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type TStepNumberProps = {
  number: number;
  isActive: boolean;
  description: string;
  onClick?: () => void;
};
function StepNumber({ number, isActive, description, onClick }: TStepNumberProps) {
  return (
    <div
      tabIndex={0}
      className={cn(
        'relative flex items-center justify-center rounded-full w-full aspect-square cursor-pointer',
        'scale-90 focus:scale-100',
        'focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-green-400/20',
        'transition-[transform] duration-200'
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          'absolute w-full h-full inset-0 border-4 border-dashed border-gray-200 rounded-full',
          isActive && 'animate-spin-slow border-green-400'
        )}
      />
      <span className="text-lg md:text-3xl font-bold">{number}</span>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="hidden md:block absolute z-10 right-24 shadow-sm w-max bg-white rounded-full p-4 border border-gray-300"
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
