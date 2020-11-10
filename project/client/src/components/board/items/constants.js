export const SHAPE_TYPES = {
    RECT: "rectangle",
    CIRCLE: "circle",
    PHOTO: "image",
    TEXT: 'text'
  };

  export const DEFAULTS = {
    RECT: {
      STROKE: "#000000",
      FILL: "#ffffff",
      WIDTH: 150,
      HEIGHT: 100,
      ROTATION: 0,
    },
    CIRCLE: {
      STROKE: "#000000",
      FILL: "#ffffff",
      RADIUS: 50,
    },
    PHOTO: {
      STROKE: "#FFF000",
      ROTATION: 0,
    },
    TEXT: {
      WIDTH: 150,
      HEIGHT: 100,
      ROTATION: 0,
      STROKE: "#000000",
      ROTATION: 0,
    },
  };

  export const LIMITS = {
    RECT: {
      MAX: 1000,
      MIN: 10,
    },
    CIRCLE: {
      MAX: 500,
      MIN: 5,
    },
    PHOTO: {
      MAX: 1000,
      MIN: 10,
    },
    TEXT: {
      MAX: 1000,
      MIN: 10,
    },
  };

  export const DRAG_DATA_KEY = "__drag_data_payload__";
