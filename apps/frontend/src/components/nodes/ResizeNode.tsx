import BaseNode from './BaseNode';

export default function ResizeNode(props: any) {
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
      <BaseNode.Header>Resize</BaseNode.Header>
      <BaseNode.Content>Resize your images :D</BaseNode.Content>
    </BaseNode>
  );
}
