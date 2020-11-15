import { createStore } from "@halka/state";
import produce, { current } from "immer";
import clamp from "clamp";
import { nanoid } from "nanoid";
import {AuthContext} from '.././../../context'

import { SHAPE_TYPES, DEFAULTS, LIMITS } from "./constants";

const APP_NAMESPACE = "__boards__";

const baseState = {
  selected: null,
  shapes: {},
};

export const useShapes = createStore(() => {
  const initialState = JSON.parse(localStorage.getItem(APP_NAMESPACE));
  return { ...baseState, shapes: initialState ?? {} };
});

const setState = (fn) => useShapes.set(produce(fn));

export const saveDiagram = (currentUserId, fetchWithCSRF, board) => {
  const state = useShapes.get();
  // localStorage.setItem(APP_NAMESPACE, JSON.stringify(state.shapes));
  // let response = await fetchWithCSRF(`/api-photos/boards/${currentUserId}`, {
  //   method: 'POST',
  //   body: newBoard,
  // });
  // console.log(response.json());

  // console.log('State.js--saveDiagram', localStorage[APP_NAMESPACE])
};

export const reset = () => {
  localStorage.removeItem(APP_NAMESPACE);
  useShapes.set(baseState);
};

export const createRectangle = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.RECT,
      width: DEFAULTS.RECT.WIDTH,
      height: DEFAULTS.RECT.HEIGHT,
      fill: DEFAULTS.RECT.FILL,
      stroke: DEFAULTS.RECT.STROKE,
      strokeWidth: DEFAULTS.RECT.STROKEWIDTH,
      rotation: DEFAULTS.RECT.ROTATION,
      x,
      y,
    };
  });
};

export const createPhoto = ({ x, y, width, height, currentPhoto }) => {
  //console.log('createPhoto')
  //console.log('width: ', width, 'height: ', height)
  setState((state) => {
    // //console.log(state.shapes)
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.PHOTO,
      url: currentPhoto,
      rotation: DEFAULTS.ROTATION,
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
    //console.log(state)
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
      type: SHAPE_TYPES.TEXT,
      padding: 10,
      rotation: DEFAULTS.ROTATION,
      x,
      y,
    };
  });
};

export const selectShape = (id) => {
  // //console.log('selectShape, id: ', id)
  // consistent ID (created with the random generator)
  setState((state) => {
    state.selected = id;
  });
};

export const clearSelection = () => {
  //console.log('State.js---100--cleared')
  setState((state) => {
    state.selected = null;
  });
};

export const moveShape = (id, event) => {
  //console.log('moveShape')
  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = event.target.x();
      shape.y = event.target.y();
    }
  //console.log('moveShape', shape)
  });
};

export const updateAttribute = (attr, value) => {
  //console.log('State.js--updateAttr', attr, value)
  setState((state) => {
    console.log(JSON.stringify(state.shapes))
    const shape = state.shapes[state.selected];
    console.log('selected shape in state: ', shape)
    if (shape) {
      shape[attr] = value;
      const shapeObject = JSON.stringify(shape)
    console.log('State.js--shape', shapeObject)
    }
  });
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
};
