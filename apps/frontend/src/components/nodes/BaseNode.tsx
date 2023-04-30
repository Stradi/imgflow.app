import { findByType } from '@/utils/react';
import { cn } from '@/utils/tw';
import { PropsWithChildren } from 'react';
import { Handle, Node, Position } from 'reactflow';

type TBaseNodeHeaderProps = PropsWithChildren;
function BaseNodeHeader({ children }: TBaseNodeHeaderProps) {
  return <header className="font-medium bg-white/50 rounded-2xl px-4 py-2 border-b border-gray-300">{children}</header>;
}

type TBaseNodeContentProps = PropsWithChildren;
function BaseNodeContent({ children }: TBaseNodeContentProps) {
  return <main className="px-4 py-2">{children}</main>;
}

type TBaseNodeHandleProps = {
  type: 'source' | 'target';
  position: Position;
};
function BaseNodeHandle({ type, position }: TBaseNodeHandleProps) {
  return <Handle type={type} position={position} />;
}

type TBaseNodeProps = PropsWithChildren & {
  topHandle?: {
    type: 'source' | 'target';
  };
  bottomHandle?: {
    type: 'source' | 'target';
  };
  node: Node;
};
function BaseNode({ children, topHandle, bottomHandle, node }: TBaseNodeProps) {
  const header = findByType(children, BaseNodeHeader);
  const content = findByType(children, BaseNodeContent);

  return (
    <div
      className={cn(
        'bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-300 w-[250px]',
        node.selected && 'ring-2 ring-green-200'
      )}
    >
      {topHandle && <BaseNodeHandle type={topHandle.type} position={Position.Top} />}
      {header}
      {content}
      {bottomHandle && <BaseNodeHandle type={bottomHandle.type} position={Position.Bottom} />}
    </div>
  );
}

export default Object.assign(BaseNode, {
  Header: BaseNodeHeader,
  Content: BaseNodeContent,
  Handle: BaseNodeHandle,
});

export type { TBaseNodeProps, TBaseNodeHeaderProps, TBaseNodeContentProps, TBaseNodeHandleProps };