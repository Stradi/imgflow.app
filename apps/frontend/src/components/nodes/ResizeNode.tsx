import BaseNode from './BaseNode';

export default function ResizeNode(props: any) {
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
      <BaseNode.Header>Resize</BaseNode.Header>
      <BaseNode.Content>Resize your images :D</BaseNode.Content>
    </BaseNode>
  );
}
