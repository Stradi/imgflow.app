'use client';

import 'reactflow/dist/style.css';

import EditorCanvas from '@/components/EditorCanvas';
import NodeToolbox from '@/components/NodeToolbox';
import { cn } from '@/utils/tw';

const Page = () => {
  return (
    <div className="relative md:w-[calc(100vw-256px)] w-screen h-[calc(100vh-56px)]">
      <div
        className={cn('absolute z-10', 'md:m-4 md:w-80 md:h-[calc(100%-2*16px)]', 'bottom-0 m-2 w-[calc(100%-2*8px)]')}
      >
        <NodeToolbox />
      </div>
      <EditorCanvas />
    </div>
  );
};

export default Page;
