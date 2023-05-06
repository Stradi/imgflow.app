import BaseNode from './BaseNode';

export default function GrayscaleNode(props: any) {
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
      <BaseNode.Header>Grayscale</BaseNode.Header>
    </BaseNode>
  );
}
