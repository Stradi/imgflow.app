import BaseNode from './BaseNode';

export default function CropNode(props: any) {
  return (
    <BaseNode
      node={props}
      topHandle={{
        type: 'target',
      }}
      bottomHandle={{
        type: 'source',
      }}
    >
      <BaseNode.Header>Crop</BaseNode.Header>
      <BaseNode.Content>Crop your IMAGE!!!</BaseNode.Content>
    </BaseNode>
  );
}
