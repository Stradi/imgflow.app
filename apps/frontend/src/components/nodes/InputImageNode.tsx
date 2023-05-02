import BaseNode from './BaseNode';

export default function InputImageNode(props: any) {
  return (
    <BaseNode
      node={props}
      rightHandle={{
        type: 'source',
      }}
    >
      <BaseNode.Header>Input Image</BaseNode.Header>
    </BaseNode>
  );
}
