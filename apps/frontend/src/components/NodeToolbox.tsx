import useCanvasStore from '@/stores/CanvasStore';
import { cn } from '@/utils/tw';
import { InfoIcon } from 'lucide-react';
import { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/HoverCard';
import { Input } from './ui/Input';

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
        'select-none p-2 rounded-md hover:cursor-pointer transition duration-100',
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

const ALL_NODES = [
  {
    name: 'Output',
    description: 'Save image with specified format and quality',
    dom: <SingleNodePreview type="Output" title="Output" description="Save image with specified format and quality" />,
  },
  {
    name: 'Resize',
    description: 'Resize the image to specified size',
    dom: <SingleNodePreview type="Resize" title="Resize" description="Resize the image to specified size" />,
  },
  {
    name: 'Crop',
    description: 'Crop your images to specified size',
    dom: <SingleNodePreview type="Crop" title="Crop" description="Crop your images to specified size" />,
  },
  {
    name: 'Rotate',
    description: 'Rotate your image with specified angle',
    dom: <SingleNodePreview type="Rotate" title="Rotate" description="Rotate your image with specified angle" />,
  },
  {
    name: 'Modulate',
    description: 'Adjust brightness, saturation, and hue of your image',
    dom: (
      <SingleNodePreview
        type="Modulate"
        title="Modulate"
        description="Adjust brightness, saturation, and hue of your image"
      />
    ),
  },
  {
    name: 'Flip',
    description: 'Flip your image horizontally or vertically',
    dom: <SingleNodePreview type="Flip" title="Flip" description="Flip your image horizontally or vertically" />,
  },
  {
    name: 'Blur',
    description: 'Blur your image with specified amount',
    dom: <SingleNodePreview type="Blur" title="Blur" description="Blur the image" />,
  },
  {
    name: 'Gamma',
    description: 'Adjust gamma of your image',
    dom: <SingleNodePreview type="Gamma" title="Gamma" description="Adjust gamma of your image" />,
  },
  {
    name: 'Negative',
    description: 'Invert the colors of your image',
    dom: <SingleNodePreview type="Negative" title="Negative" description="Invert the colors of your image" />,
  },
  {
    name: 'Grayscale',
    description: 'Convert your image to grayscale',
    dom: <SingleNodePreview type="Grayscale" title="Grayscale" description="Convert your image to grayscale" />,
  },
  {
    name: 'Text',
    description: 'Add text to your image',
    dom: <SingleNodePreview type="Text" title="Text" description="Add text to your image" />,
  },
  {
    name: 'Tint',
    description: 'Tint your image with specified color',
    dom: <SingleNodePreview type="Tint" title="Tint" description="Tint your image with specified color" />,
  },
];

export default function NodeToolbox() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNodes = ALL_NODES.filter((node) => {
    return node.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-2 w-full h-full bg-white/50 backdrop-blur-sm border-2 rounded-xl p-4 border-gray-300">
      <p className="text-xl font-medium">Nodes</p>
      <div>
        <Input placeholder="Search nodes" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div
        className={cn(
          'flex items-stretch gap-2 flex-nowrap overflow-x-auto overflow-y-hidden',
          'md:block md:space-y-2 md:overflow-auto md:mt-4'
        )}
      >
        {filteredNodes.map((node) => node.dom)}
      </div>
    </div>
  );
}
