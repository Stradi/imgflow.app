import { findByType } from '@/utils/react';
import { cn } from '@/utils/tw';
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import { PropsWithChildren, cloneElement, useState } from 'react';
import { Handle, Node, Position } from 'reactflow';

type TBaseNodeHeaderProps = PropsWithChildren & {
  collapsible?: boolean;
  isCollapsed?: boolean;
  onCollapseChange?: () => void;
};

function BaseNodeHeader({ children, collapsible, isCollapsed, onCollapseChange }: TBaseNodeHeaderProps) {
  return (
    <header className="font-medium bg-white/50 rounded-2xl px-4 py-2 border-b border-gray-300">
      <div className="flex justify-between items-center">
        {children}
        {collapsible &&
          (isCollapsed ? (
            <ChevronsUpDownIcon className="w-4 h-4 cursor-pointer" onClick={onCollapseChange} />
          ) : (
            <ChevronsDownUpIcon className="w-4 h-4 cursor-pointer" onClick={onCollapseChange} />
          ))}
      </div>
    </header>
  );
}

type TBaseNodeContentProps = PropsWithChildren;
function BaseNodeContent({ children }: TBaseNodeContentProps) {
  return <main className="px-4 py-2 space-y-2">{children}</main>;
}

type TBaseNodeHandleProps = {
  type: 'source' | 'target';
  position: Position;
};
function BaseNodeHandle({ type, position }: TBaseNodeHandleProps) {
  return (
    <Handle
      type={type}
      position={position}
      style={{
        width: '16px',
        height: '16px',
        opacity: '0.5',
      }}
    />
  );
}

type TBaseNodeProps = PropsWithChildren & {
  leftHandle?: {
    type: 'source' | 'target';
  };
  rightHandle?: {
    type: 'source' | 'target';
  };
  node: Node;
};
function BaseNode({ children, leftHandle, rightHandle, node }: TBaseNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const header = findByType(children, BaseNodeHeader);
  const content = findByType(children, BaseNodeContent);

  let headerToRender = header;

  // @ts-ignore
  if (header && header[0] && header[0].props.collapsible) {
    // @ts-ignore
    headerToRender = cloneElement(header[0], {
      // @ts-ignore
      collapsible: true,
      isCollapsed,
      onCollapseChange: () => setIsCollapsed(!isCollapsed),
    });
  }

  return (
    <div
      className={cn(
        'bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-300 min-w-[300px]',
        node.selected && 'ring-2 ring-green-200'
      )}
    >
      {leftHandle && <BaseNodeHandle type={leftHandle.type} position={Position.Left} />}
      {headerToRender}
      {isCollapsed ? null : content}
      {rightHandle && <BaseNodeHandle type={rightHandle.type} position={Position.Right} />}
    </div>
  );
}

export default Object.assign(BaseNode, {
  Header: BaseNodeHeader,
  Content: BaseNodeContent,
  Handle: BaseNodeHandle,
});

export type { TBaseNodeProps, TBaseNodeHeaderProps, TBaseNodeContentProps, TBaseNodeHandleProps };
