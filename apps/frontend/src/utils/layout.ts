import dagre from 'dagre';
import cloneDeep from 'lodash.clonedeep';
import { Edge, Node, Position, isNode } from 'reactflow';

export function getLayoutedElements(_elements: Node[] | Edge[]) {
  const elements = cloneDeep(_elements);
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR', ranksep: 100 });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: el.width || 250, height: el.height || 50 });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = Position.Top;
      el.sourcePosition = Position.Bottom;
      el.position = {
        x: nodeWithPosition.x - (el.width || 250) / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - (el.height || 50) / 2,
      };
    }

    return el;
  });
}
