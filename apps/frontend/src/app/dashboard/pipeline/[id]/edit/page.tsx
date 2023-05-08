'use client';

import 'reactflow/dist/style.css';

import EditorCanvas from '@/components/EditorCanvas';
import NodeToolbox from '@/components/NodeToolbox';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getPipelineById, savePipeline } from '@/services/pipeline';
import useCanvasStore from '@/stores/CanvasStore';
import { cn } from '@/utils/tw';
import { PlayIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { shallow } from 'zustand/shallow';

const Page = ({
  params: { id: pipelineId },
}: {
  params: {
    id: string;
  };
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const { pipelineName, setPipelineName, setNodes, setEdges, setCounters, setNodeData } = useCanvasStore(
    (state) => ({
      pipelineName: state.pipelineName,
      setPipelineName: state.setPipelineName,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      setCounters: state.setCounters,
      setNodeData: state.setNodeData,
    }),
    shallow
  );

  useEffect(() => {
    async function fetchPipeline() {
      const response = await getPipelineById(pipelineId);

      const remoteNodes = JSON.parse(response.data['dataJson'])['nodes'];
      const remoteEdges = JSON.parse(response.data['dataJson'])['edges'];

      setCounters(remoteNodes.length, remoteEdges.length);

      setNodes(remoteNodes);
      setEdges(remoteEdges);

      for (const node of remoteNodes) {
        setNodeData(node.id, node.data || {});
      }

      setPipelineName(response.data['name']);
    }

    fetchPipeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Toaster />
      <div className="border-b border-gray-200 flex items-center p-2 gap-1">
        <Input
          className="md:w-1/3"
          type="text"
          placeholder="Pipeline Name"
          value={pipelineName}
          onChange={(e) => setPipelineName(e.target.value)}
        />
        <Button
          onClick={async () => {
            if (!pipelineName) {
              toast.error('Please name your pipeline.', {
                duration: 2000,
              });
              return;
            }

            setIsSaving(true);
            await savePipeline(
              pipelineId,
              pipelineName,
              JSON.stringify({
                nodes: useCanvasStore.getState().nodes,
                edges: useCanvasStore.getState().edges,
              })
            );
            setIsSaving(false);
          }}
        >
          Save Pipeline
        </Button>
        <Link href={`/dashboard/pipeline/${pipelineId}/run`} passHref className="ml-auto">
          <Button variant="outline">
            <PlayIcon className="w-4 h-4 mr-2" />
            Run This Pipeline
          </Button>
        </Link>
      </div>
      <div className="relative md:w-[calc(100vw-256px)] w-screen h-[calc(100vh-128px)]">
        {isSaving && (
          <div className="absolute inset-0 w-full h-full z-20 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-white text-4xl">Saving your changes...</div>
          </div>
        )}
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
