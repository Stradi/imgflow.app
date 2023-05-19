'use client';

import { cn } from '@/utils/tw';
import CTAButton from './CTAButton';

export default function HeroSection() {
  return (
    <div className="group rounded-[32px] md:rounded-[64px] bg-gradient-to-br from-[#0d3b05] to-[#041a00]">
      <div className="flex flex-col py-16 gap-8 w-3/4 mx-auto">
        <h1
          className={cn(
            'text-3xl md:text-6xl font-bold md:leading-snug text-center text-white/90 bg-clip-text',
            'transition duration-200 ease-out',
            'scale-110'
          )}
        >
          Stop Wasting Time on Image Processing
        </h1>
        <p
          className={cn(
            'text-white/75 text-center text-lg md:text-2xl md:w-3/4 mx-auto transition duration-200 delay-75',
            'scale-110'
          )}
        >
          Streamline your image processing workflow with ImgFlow&apos;s node-based drag and drop editor.
        </p>
        <CTAButton />
      </div>
    </div>
  );
}
