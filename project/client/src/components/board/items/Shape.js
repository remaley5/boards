import React, { useCallback } from "react";

import { SHAPE_TYPES } from "./constants";
import { useShapes } from "./state";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { Photo } from "./Photo";
import { Text } from "./Text"

export function Shape({ shape, stage, canvas, layer }) {
  const isSelectedSelector = useCallback(
    (state) => state.selected === shape.id,
    [shape]
    );
  //console.log('shape: width', shape.width, 'height',)
  const isSelected = useShapes(isSelectedSelector);

  if (shape.type === SHAPE_TYPES.RECT) {
    return <Rectangle {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.CIRCLE) {
    return <Circle {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.PHOTO) {
    return <Photo {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.TEXT) {
    return <Text {...shape} isSelected={isSelected} stage={stage} canvas={canvas} layer={layer}/>;
  }

  return null;
}
