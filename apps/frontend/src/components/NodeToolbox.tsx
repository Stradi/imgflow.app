import useCanvasStore from '@/stores/CanvasStore';
import { cn } from '@/utils/tw';
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
      className={cn(
        'select-none p-2 rounded-2xl hover:cursor-pointer transition duration-100',
        'max-w-3/5 basis-3/5 grow-0 shrink-0 border border-gray-200 hover:border-green-400',
        'md:max-w-none md:basis-auto md:grow-0 md:shrink-0'
      )}
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
          <div className="hidden md:block">
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <InfoIcon className="w-5 h-5 text-gray-500 data-[state='open']:text-gray-900" />
              </HoverCardTrigger>
              <HoverCardContent className="bg-white rounded-2xl" side="right">
                {/* Display animation to showcase the action. */}
              </HoverCardContent>
            </HoverCard>
          </div>
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
      <div
        className={cn(
          'flex items-stretch gap-2 flex-nowrap overflow-x-auto overflow-y-hidden',
          'md:block md:space-y-2 md:overflow-auto md:mt-4'
        )}
      >
        <SingleNodePreview type="Output" title="Output" description="Save image with specified format and quality" />
        <SingleNodePreview type="Resize" title="Resize" description="Resize the image to specified size" />
        <SingleNodePreview type="Crop" title="Crop" description="Crop your images to specified size" />
      </div>
    </div>
  );
}
