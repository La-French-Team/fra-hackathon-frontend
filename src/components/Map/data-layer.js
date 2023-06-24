export const flatLayer = {
  id: "flat-layer",
  type: "fill",
  paint: {
    "fill-color": ["get", "color"],
    "fill-opacity": 0.5,
  },
};

export const extrusionLayer = {
  id: "room-extrusion",
  type: "fill-extrusion",
  source: "floorplan",
  paint: {
    // Get the `fill-extrusion-color` from the source `color` property.
    "fill-extrusion-color": ["get", "color"],

    // Get `fill-extrusion-height` from the source `height` property.
    "fill-extrusion-height": ["get", "height"],

    // Get `fill-extrusion-base` from the source `base_height` property.
    "fill-extrusion-base": ["get", "base_height"],

    // Make extrusions slightly opaque to see through indoor walls.
    "fill-extrusion-opacity": 0.5,
  },
};
