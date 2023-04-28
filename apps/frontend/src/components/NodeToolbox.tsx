import useCanvasStore from '@/stores/CanvasStore';
import { InfoIcon } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/HoverCard';

type TSingleNodePreview = {
  title: string;
  description: string;
  type: string;
};

function SingleNodePreview({ title, description, type }: TSingleNodePreview) {
  const setIsDraggingNewNode = useCanvasStore((state) => state.setIsDraggingNewNode);
  return (
    <div
      className="select-none p-2 rounded-2xl hover:cursor-pointer ring-1 ring-gray-200 hover:ring-green-400 transition duration-100"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/reactflow', type);
        e.dataTransfer.effectAllowed = 'move';
        setIsDraggingNewNode(true);
      }}
      onDragEnd={() => {
        setIsDraggingNewNode(false);
      }}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">{title}</h2>
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              <InfoIcon className="w-5 h-5 text-gray-500 data-[state='open']:text-gray-900" />
            </HoverCardTrigger>
            <HoverCardContent className="bg-white rounded-2xl" side="right">
              {/* Display animation to showcase the action. */}
            </HoverCardContent>
          </HoverCard>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default function NodeToolbox() {
  return (
    <div className="w-full h-full bg-white/50 backdrop-blur-sm border-2 rounded-xl p-4 border-gray-300">
      <p className="text-xl font-medium">Nodes</p>
      <div className="mt-4 space-y-2">
        <SingleNodePreview type="Resize" title="Resize" description="Resizes your image to specified dimensions." />
        <SingleNodePreview type="Crop" title="Crop" description="Crop your images to specified size" />
      </div>
    </div>
  );
}
