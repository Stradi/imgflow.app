'use client';

import 'reactflow/dist/style.css';

import EditorCanvas from '@/components/EditorCanvas';
import NodeToolbox from '@/components/NodeToolbox';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getPipelineById, savePipeline } from '@/services/pipeline';
import useCanvasStore from '@/stores/CanvasStore';
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

  const { pipelineName, setPipelineName, setNodes, setEdges, setCounters, setNodeData, nodes } = useCanvasStore(
    (state) => ({
      pipelineName: state.pipelineName,
      setPipelineName: state.setPipelineName,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      setCounters: state.setCounters,
      setNodeData: state.setNodeData,
      nodes: state.nodes,
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
    <div className="flex flex-col h-[calc(100vh-81px)]">
      <Toaster />
      <div className="border-b w-full border-gray-200 p-2 max-w-5xl mx-auto">
        <div className="w-full flex items-center gap-2">
          <Input
            className="w-1/3"
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

              const firstInvalidNode = nodes.find(
                (node) => node.data.getValidationError && node.data.getValidationError() !== ''
              );
              if (firstInvalidNode) {
                toast.error(
                  <div>
                    <p className="font-medium text-sm">Please fix the error in {firstInvalidNode.type} node.</p>
                    <p className="text-sm">{firstInvalidNode.data.getValidationError()}</p>
                  </div>,
                  {
                    duration: 2000,
                  }
                );
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
              toast.success('Pipeline saved successfully.', {
                duration: 2000,
              });
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
      </div>
      <div className="relative w-full grow">
        <div className="absolute md:inset-2 md:w-80 md:h-[calc(100%-16px)] z-10 w-[calc(100%-16px)] bottom-2 left-2 h-min">
          <NodeToolbox />
        </div>
        <EditorCanvas />
      </div>
    </div>
  );
};

export default Page;
