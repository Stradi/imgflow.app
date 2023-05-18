'use client';

import { cn } from '@/utils/tw';
import { useState } from 'react';
import CTAButton from './CTAButton';

export default function HeroSection() {
  const [gradient, setGradient] = useState({
    position: '15% 15%',
    fromColor: '#0d3b05',
    toColor: '#041a00',
  });

  return (
    <div
      className="select-none group rounded-[32px] md:rounded-[64px] hover:rounded-[16px] md:hover:rounded-[32px] transition-[border-radius] duration-200"
      style={{
        background: `radial-gradient(500px at ${gradient.position}, ${gradient.fromColor} 10%, ${gradient.toColor} 100%)`,
      }}
      onMouseMove={(e) => {
        e.preventDefault();

        const { x: leftEdge, y: topEdge, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - leftEdge;
        const y = e.clientY - topEdge;

        const xPercent = (x / width) * 100;
        const yPercent = (y / height) * 100;

        setGradient({
          position: `${xPercent}% ${yPercent}%`,
          fromColor: '#0d3b05',
          toColor: '#041a00',
        });
      }}
    >
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
