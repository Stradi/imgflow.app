import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import SliderInput from './inputs/SliderInput';

export default function GammaNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  return (
    <BaseNode
      node={props}
      leftHandle={{
        type: 'target',
      }}
      rightHandle={{
        type: 'source',
      }}
    >
      <BaseNode.Header collapsible>Gamma</BaseNode.Header>
      <BaseNode.Content>
        <div className="space-y-4 pb-2">
          <SliderInput
            label="Gamma"
            min={1}
            max={3}
            step={0.1}
            value={getNodeData(props.id).gamma}
            onValueChange={(e) => setNodeData(props.id, { ...getNodeData(props.id), gamma: e })}
          />
          <SliderInput
            label="Gamma Out"
            min={1}
            max={3}
            step={0.1}
            value={getNodeData(props.id).gammaOut}
            onValueChange={(e) => setNodeData(props.id, { ...getNodeData(props.id), gammaOut: e })}
          />
        </div>
      </BaseNode.Content>
    </BaseNode>
  );
}
