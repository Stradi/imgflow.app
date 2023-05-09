import useCanvasStore from '@/stores/CanvasStore';
import { isNumberValid } from '@/utils/check';
import { useEffect } from 'react';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';

export default function BlurNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { sigma } = getNodeData(props.id);
    if (!isNumberValid(sigma, 0.3, 100)) {
      return "'sigma' must be between 0.3 and 100";
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
    const { sigma } = getNodeData(props.id);
    if (!isNumberValid(sigma, 0.3, 100)) {
      set({ sigma: 10 });
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
      <BaseNode.Header collapsible>Blur</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Amount"
          placeholder="Blur amount"
          min={0}
          max={100}
          value={getNodeData(props.id).sigma}
          onValueChange={(e) => set({ sigma: e })}
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
