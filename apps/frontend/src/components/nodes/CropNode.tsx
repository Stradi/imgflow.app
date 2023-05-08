import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';

export default function CropNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { top, left, bottom, right } = getNodeData(props.id);
    if (!top || isNaN(top)) {
      return 'Top cannot be empty';
    }

    if (top < 0 || top > 10000) {
      return 'Top must be between 0 and 10000';
    }

    if (!left || isNaN(left)) {
      return 'Left cannot be empty';
    }

    if (left < 0 || left > 10000) {
      return 'Left must be between 0 and 10000';
    }

    if (!bottom || isNaN(bottom)) {
      return 'Bottom cannot be empty';
    }

    if (bottom < 0 || bottom > 10000) {
      return 'Bottom must be between 0 and 10000';
    }

    if (!right || isNaN(right)) {
      return 'Right cannot be empty';
    }

    if (right < 0 || right > 10000) {
      return 'Right must be between 0 and 10000';
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
      <BaseNode.Header collapsible>Crop</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Top"
          placeholder="Position of top left corner"
          value={getNodeData(props.id).top}
          min={0}
          max={10000}
          onValueChange={(e) =>
            set({
              top: e,
            })
          }
        />
        <NumberInput
          label="Left"
          placeholder="Position of top left corner"
          value={getNodeData(props.id).left}
          min={0}
          max={10000}
          onValueChange={(e) =>
            set({
              left: e,
            })
          }
        />
        <NumberInput
          label="Width"
          placeholder="Width of cropped image"
          value={getNodeData(props.id).width}
          min={0}
          max={10000}
          onValueChange={(e) =>
            set({
              width: e,
            })
          }
        />
        <NumberInput
          label="Height"
          placeholder="Height of cropped image"
          value={getNodeData(props.id).height}
          min={0}
          max={10000}
          onValueChange={(e) =>
            set({
              height: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
