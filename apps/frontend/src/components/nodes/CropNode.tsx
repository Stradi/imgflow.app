import BaseNode from './BaseNode';

export default function CropNode(props: any) {
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
      <BaseNode.Header>Crop</BaseNode.Header>
      <BaseNode.Content>Crop your IMAGE!!!</BaseNode.Content>
    </BaseNode>
  );
}
