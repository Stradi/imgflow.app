'use client';

import 'reactflow/dist/style.css';

import EditorCanvas from '@/components/EditorCanvas';
import NodeToolbox from '@/components/NodeToolbox';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useCanvasStore from '@/stores/CanvasStore';
import { cn } from '@/utils/tw';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Edge, Node } from 'reactflow';
import { shallow } from 'zustand/shallow';

const Page = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { pipelineName, setPipelineName, setNodes, setEdges } = useCanvasStore(
    (state) => ({
      pipelineName: state.pipelineName,
      setPipelineName: state.setPipelineName,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
    }),
    shallow
  );

  const { getNewNodeID, getNewEdgeID } = useCanvasStore(
    (state) => ({
      getNewNodeID: state.getNewNodeID,
      getNewEdgeID: state.getNewEdgeID,
    }),
    shallow
  );

  useEffect(() => {
    if (searchParams.has('new')) {
      const initialNodes: Node[] = [
        {
          id: getNewNodeID(),
          position: { x: 0, y: 0 },
          type: 'InputImage',
          deletable: false,
          data: {},
        },
        {
          id: getNewNodeID(),
          position: { x: 0, y: 150 },
          type: 'Output',
          deletable: false,
          data: {},
        },
      ];

      const initialEdges: Edge[] = [
        {
          id: getNewEdgeID(),
          source: initialNodes[0].id,
          target: initialNodes[1].id,
          type: 'Reactive',
        },
      ];

      setPipelineName('Untitled Pipeline');
      setNodes(initialNodes);
      setEdges(initialEdges);
    } else {
      console.log('editingf');
      // TODO: Fetch pipeline data from backend
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="h-16 border-b border-gray-200 flex items-center p-3 gap-4">
        <Input
          className="md:w-1/3"
          type="text"
          placeholder="Untitled Pipeline"
          value={pipelineName}
          onChange={(e) => setPipelineName(e.target.value)}
        />
        <Button className="">Save Pipeline</Button>
      </div>
      <div className="relative md:w-[calc(100vw-256px)] w-screen h-[calc(100vh-128px)]">
        <div
          className={cn(
            'absolute z-10',
            'md:m-4 md:w-80 md:h-[calc(100%-2*16px)]',
            'bottom-0 m-2 w-[calc(100%-2*8px)]'
          )}
        >
          <NodeToolbox />
        </div>
        <EditorCanvas />
      </div>
    </div>
  );
};

export default Page;
