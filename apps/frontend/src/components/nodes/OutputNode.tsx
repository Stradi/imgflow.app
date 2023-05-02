import BaseNode from './BaseNode';

export default function OutputNode(props: any) {
  return (
    <BaseNode
      node={props}
      leftHandle={{
        type: 'target',
      }}
    >
      <BaseNode.Header>Output</BaseNode.Header>
      <BaseNode.Content>Output yor image</BaseNode.Content>
    </BaseNode>
  );
}
