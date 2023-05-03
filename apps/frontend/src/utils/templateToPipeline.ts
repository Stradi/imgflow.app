const TEMPLATE_TO_PIPELINE = {
  scratch: {
    nodes: [
      {
        id: 'node-0',
        type: 'InputImage',
        deletable: false,
        data: {},
        position: {
          x: 0,
          y: 0,
        },
      },
      {
        id: 'node-1',
        type: 'Output',
        deletable: false,
        data: {},
        position: {
          x: 250,
          y: 0,
        },
      },
    ],
    edges: [
      {
        id: 'edge-0',
        source: 'node-0',
        target: 'node-1',
        type: 'Reactive',
      },
    ],
  },
  optimize: {
    nodes: [
      {
        id: 'node-0',
        type: 'InputImage',
        deletable: false,
        data: {},
        position: {
          x: 0,
          y: 0,
        },
      },
      {
        id: 'node-1',
        type: 'Output',
        deletable: false,
        data: {},
        position: {
          x: 500,
          y: 0,
        },
      },
      {
        id: 'node-2',
        type: 'Resize',
        data: {},
        position: {
          x: 250,
          y: 0,
        },
      },
    ],
    edges: [
      {
        id: 'edge-0',
        source: 'node-0',
        target: 'node-2',
        type: 'Reactive',
      },
      {
        id: 'edge-1',
        source: 'node-2',
        target: 'node-1',
        type: 'Reactive',
      },
    ],
  },
  thumbnail: {
    nodes: [
      {
        id: 'node-0',
        type: 'InputImage',
        deletable: false,
        data: {},
        position: {
          x: 0,
          y: 0,
        },
      },
      {
        id: 'node-1',
        type: 'Output',
        deletable: false,
        data: {},
        position: {
          x: 500,
          y: 0,
        },
      },
      {
        id: 'node-2',
        type: 'Resize',
        data: {},
        position: {
          x: 250,
          y: 0,
        },
      },
    ],
    edges: [
      {
        id: 'edge-0',
        source: 'node-0',
        target: 'node-2',
        type: 'Reactive',
      },
      {
        id: 'edge-1',
        source: 'node-2',
        target: 'node-1',
        type: 'Reactive',
      },
    ],
  },
  watermark: {
    nodes: [
      {
        id: 'node-0',
        type: 'InputImage',
        deletable: false,
        data: {},
        position: {
          x: 0,
          y: 0,
        },
      },
      {
        id: 'node-1',
        type: 'Output',
        deletable: false,
        data: {},
        position: {
          x: 500,
          y: 0,
        },
      },
      {
        id: 'node-2',
        type: 'Resize',
        data: {},
        position: {
          x: 250,
          y: 0,
        },
      },
    ],
    edges: [
      {
        id: 'edge-0',
        source: 'node-0',
        target: 'node-2',
        type: 'Reactive',
      },
      {
        id: 'edge-1',
        source: 'node-2',
        target: 'node-1',
        type: 'Reactive',
      },
    ],
  },
};

export default TEMPLATE_TO_PIPELINE;
