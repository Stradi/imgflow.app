import useCanvasStore from '@/stores/CanvasStore';
import { isNumberValid } from '@/utils/check';
import { useEffect } from 'react';
import BaseNode from './BaseNode';
import SliderInput from './inputs/SliderInput';

export default function GammaNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { gamma, gammaOut } = getNodeData(props.id);
    if (!isNumberValid(gamma, 1, 3)) {
      return "'gamma' must be between 1 and 3";
    }

    if (!isNumberValid(gammaOut, 1, 3)) {
      return "'gammaOut' must be between 1 and 3";
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

  useEffect(() => {
    const { gamma, gammaOut } = getNodeData(props.id);
    if (!isNumberValid(gamma, 1, 3)) {
      set({ gamma: 1 });
    }

    if (!isNumberValid(gammaOut, 1, 3)) {
      set({ gammaOut: 1 });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
