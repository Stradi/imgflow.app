'use client';

import EditorCanvas from '@/components/EditorCanvas';
import NodeToolbox from '@/components/NodeToolbox';
import 'reactflow/dist/style.css';

const Page = () => {
  return (
    <div className="relative w-screen h-screen flex">
      <div className="absolute m-4 w-80 h-[calc(100%-2*16px)] z-10">
        <NodeToolbox />
      </div>
      <EditorCanvas />
    </div>
  );
};
export default Page;
