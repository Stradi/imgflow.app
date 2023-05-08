import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import SliderInput from './inputs/SliderInput';

export default function GammaNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { gamma, gammaOut } = getNodeData(props.id);
    if (!gamma || isNaN(gamma)) {
      return 'Gamma cannot be empty';
    }

    if (gamma < 1 || gamma > 3) {
      return 'Gamma must be between 1 and 3';
    }

    if (!gammaOut || isNaN(gammaOut)) {
      return 'Gamma Out cannot be empty';
    }

    if (gammaOut < 1 || gammaOut > 3) {
      return 'Gamma Out must be between 1 and 3';
    }

    return '';
  }

  function set(data: any) {
    setNodeData(props.id, {
      ...getNodeData(props.id),
      ...data,
      getValidationError,
    });
  }

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
            onValueChange={(e) => set({ gamma: e })}
          />
          <SliderInput
            label="Gamma Out"
            min={1}
            max={3}
            step={0.1}
            value={getNodeData(props.id).gammaOut}
            onValueChange={(e) => set({ gammaOut: e })}
          />
        </div>
      </BaseNode.Content>
    </BaseNode>
  );
}
