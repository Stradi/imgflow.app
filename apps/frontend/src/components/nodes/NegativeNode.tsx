import BaseNode from './BaseNode';

export default function NegativeNode(props: any) {
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
      <BaseNode.Header>Negative</BaseNode.Header>
    </BaseNode>
  );
}
