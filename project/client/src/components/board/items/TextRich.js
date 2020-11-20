import React, { useRef, useEffect, useCallback, useContext } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import { LIMITS } from "./constants";
import { selectShape, transformPhotoShape, moveShape } from "./state";

const boundBoxCallbackForPhoto = (oldBox, newBox) => {
  if (
    newBox.width < LIMITS.PHOTO.MIN ||
    newBox.height < LIMITS.PHOTO.MIN ||
    newBox.width > LIMITS.PHOTO.MAX ||
    newBox.height > LIMITS.PHOTO.MAX
  ) {
    return oldBox;
  }
  return newBox;
};


export function Text({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  const { image } = shapeProps

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const newImage = new Image();

  newImage.src = image

  const handleSelect = useCallback(
    (event) => {
      event.cancelBubble = true;

      selectShape(id);
    },
    [id]
  );

  const handleDrag = useCallback(
    (event) => {
      moveShape(id, event);
    },
    [id]
  );

  const handleTransform = useCallback(
    (event) => {
      transformPhotoShape(shapeRef.current, id, event);
    },
    [id]
  );

  return (
    <>
     {/* { image.crossOrigin ? */}
       <KonvaImage
        className='photo'
        onClick={handleSelect}
        onTap={handleSelect}
        image={newImage}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={handleDrag}
        onTransformEnd={handleTransform}
      /> : null }
      {isSelected && (
        <Transformer
          keepRatio={true}
          anchorSize={5}
          borderDash={[6, 2]}
          ref={transformerRef}
          boundBoxFunc={boundBoxCallbackForPhoto}
        />
      )}
    </>
  );
}
