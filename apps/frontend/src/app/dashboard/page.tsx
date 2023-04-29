'use client';

import EditorCanvas from '@/components/EditorCanvas';
import NodeToolbox from '@/components/NodeToolbox';
import { cn } from '@/utils/tw';
import 'reactflow/dist/style.css';

const Page = () => {
  return (
    <div className="relative w-screen h-screen flex">
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
