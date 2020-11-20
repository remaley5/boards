import { createStore } from "@halka/state";
import produce, { current } from "immer";
import clamp from "clamp";
import { nanoid } from "nanoid";
import {AuthContext} from '.././../../context'

import { SHAPE_TYPES, DEFAULTS, LIMITS } from "./constants";

const APP_NAMESPACE = "__boards__";
const BOARD_PHOTOS = '__photos__';
const baseState = {
  selected: null,
  newText: false,
  shapes: {},
};

export const useShapes = createStore(() => {
  const initialState = JSON.parse(localStorage.getItem(APP_NAMESPACE));
  return { ...baseState, shapes: initialState ?? {}};
});

const setState = (fn) => useShapes.set(produce(fn));

export const setPhotos = (photos) => {
  localStorage.setItem(BOARD_PHOTOS, JSON.stringify(photos))
}

export const getPhotos = () => {
    const photos = JSON.parse(localStorage.getItem(BOARD_PHOTOS))
    return photos;
}

export const saveDiagram = () => {
  const state = useShapes.get();
  localStorage.setItem(APP_NAMESPACE, JSON.stringify(state.shapes));
};

export const deleteShape = () => {
  setState((state) => {
    const shape = state.shapes[state.selected];
    if (shape) {
      delete state.shapes[state.selected];
    }
  });
  saveDiagram();
}

export const reset = () => {
  localStorage.removeItem(APP_NAMESPACE);
  useShapes.set(baseState);
};

export const createRectangle = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.RECT,
      width: DEFAULTS.WIDTH,
      height: DEFAULTS.HEIGHT,
      fill: DEFAULTS.FILL,
      stroke: DEFAULTS.STROKE,
      strokeWidth: DEFAULTS.STROKEWIDTH,
      rotation: DEFAULTS.ROTATION,
      x,
      y,
    };
  });
};

export const createPhoto = ({ x, y, width, height, currentPhoto }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.PHOTO,
      url: currentPhoto,
      rotation: DEFAULTS.ROTATION,
      stroke: DEFAULTS.STROKE,
      strokeWidth: DEFAULTS.STROKEWIDTH,
      width,
      height,
      x,
      y,
    };
  });
};

export const createCircle = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.CIRCLE,
      radius: DEFAULTS.CIRCLE.RADIUS,
      fill: DEFAULTS.FILL,
      strokeWidth: DEFAULTS.STROKEWIDTH,
      stroke: DEFAULTS.STROKE,
      x,
      y,
    };
  });
};

export const createText = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      fontFamily: 'Arial',
      text: 'enter text',
      fontSize: 20,
      align: 'center',
      verticalAlign:'middle',
      wrap: 'word',
      fontStyle: 'bold',
      fill: 'black',
      opacity: 50,
      type: SHAPE_TYPES.TEXT,
      padding: 10,
      rotation: DEFAULTS.ROTATION,
      x,
      y,
    };
  });
};

export const selectShape = (id) => {
  setState((state) => {
    state.selected = id;
  });
};

export const clearSelection = () => {
  setState((state) => {
    state.selected = null;
  });
};

export const createNewText = () => {
  setState((state) => {
    state.newText = true;
  });
}

export const moveShape = (id, event) => {
  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = event.target.x();
      shape.y = event.target.y();
    }
  });
  saveDiagram()
};

export const updateAttribute = (attr, value) => {
  setState((state) => {
    console.log(JSON.stringify(state.shapes))
    const shape = state.shapes[state.selected];
    if (shape) {
      shape[attr] = value;
      const shapeObject = JSON.stringify(shape)
    }
  });
  saveDiagram()
};

export const moveToTop = () => {
  setState((state) => {
    console.log('SHAPES state.shapes', JSON.stringify(state.shapes))
  })
};

export const transformRectangleShape = (node, id, event) => {
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();
      shape.rotation = node.rotation();
      shape.width = clamp(
        node.width() * scaleX,
        LIMITS.RECT.MIN,
        LIMITS.RECT.MAX
      );
      shape.height = clamp(
        node.height() * scaleY,
        LIMITS.RECT.MIN,
        LIMITS.RECT.MAX
      );
    }
  });
  saveDiagram()
};

export const transformPhotoShape = (node, id, event) => {
  //console.log('transformPhotoShape, node: ', node,' id: ',  id, ' event: ', event)
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];
    // //console.log('shape', shape)
    // proxy

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.rotation = node.rotation();

      shape.width = clamp(
        node.width() * scaleX,
        LIMITS.PHOTO.MIN,
        LIMITS.PHOTO.MAX
      );
      shape.height = clamp(
        node.height() * scaleY,
        LIMITS.PHOTO.MIN,
        LIMITS.PHOTO.MAX
      );

      // //console.log('shape: ', shape )
      // Proxy
    }
  });
  saveDiagram()
};

export const transformCircleShape = (node, id, event) => {
  const scaleX = node.scaleX();

  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.radius = clamp(
        (node.width() * scaleX) / 2,
        LIMITS.CIRCLE.MIN,
        LIMITS.CIRCLE.MAX
      );
    }
  });
  saveDiagram()
};

export const transformTextShape = (node, id, event) => {
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.rotation = node.rotation();

      shape.width = clamp(
        node.width() * scaleX,
        LIMITS.TEXT.MIN,
        LIMITS.TEXT.MAX
      );
      shape.height = clamp(
        node.height() * scaleY,
        LIMITS.TEXT.MIN,
        LIMITS.TEXT.MAX
      );
    }
  });
  saveDiagram()
};
