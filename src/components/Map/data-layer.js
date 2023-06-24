export const flatLayer = {
  id: "flat-layer",
  type: "fill",
  paint: {
    "fill-color": ["get", "color"],
    "fill-opacity": 0.5,
  },
};

export const lineLayer = {
  'id': 'route',
  'type': 'line',
  'source': 'route',
  'layout': {
    'line-join': 'round',
    'line-cap': 'round'
  },
  'paint': {
    'line-color': '#888',
    'line-width': 8
  }
};

export const lineAnimationLayer = {
  'id': 'line-animation',
  'type': 'line',
  'source': 'line',
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#1e32fa',
    'line-width': 5,
    'line-opacity': 0.8
  }
}