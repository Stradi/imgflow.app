type TSingleNodePreview = {
  title: string;
  description: string;
  type: string;
};

function SingleNodePreview({ title, description, type }: TSingleNodePreview) {
  return (
    <div
      className="select-none p-2 rounded-lg hover:cursor-pointer ring-1 ring-gray-200 hover:ring-green-400 transition duration-100"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/reactflow', type);
        e.dataTransfer.effectAllowed = 'move';
      }}
    >
      <div className="flex flex-col">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default function NodeToolbox() {
  return (
    <div className="w-full h-full bg-white/50 backdrop-blur-sm border-2 rounded-xl p-4 border-gray-300">
      <p className="text-xl font-medium">Nodes</p>
      <div className="mt-4">
        <SingleNodePreview
          type="Resize"
          title="Resize Node"
          description="Resizes your image to specified dimensions and method."
        />
      </div>
    </div>
  );
}
