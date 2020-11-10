import React, { useRef, useEffect, useCallback, useContext } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import useImage from 'use-image';
import { PhotoContext } from "../../../context";
import cherub_three from '../../../images/cherub.jpeg'
import { LIMITS } from "./constants";
import { selectShape, transformPhotoShape, moveShape } from "./state";

const boundBoxCallbackForPhoto = (oldBox, newBox) => {
  //console.log('Photo.js--boundBoxCallbackForPhoto', 'oldBox: ', oldBox, 'newBox', newBox )
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


export function Photo({ id, isSelected, type, ...shapeProps }) {
  //console.log('Photo')
  //console.log('isSelected', isSelected)
  //console.log('shapeProps', shapeProps)
    const shapeRef = useRef();
    const transformerRef = useRef();

    const {url} = shapeProps

    useEffect(() => {
      // //console.log('shapeRef.current', shapeRef.current ) // Image object
        if (isSelected) {
            transformerRef.current.nodes([shapeRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

  const [image] = useImage(url)

  const handleSelect = useCallback(
    (event) => {
      // //console.log('handleSelect', event) // currentTarget { attrs { photo info }}
      event.cancelBubble = true;

      selectShape(id);
    },
    [id]
  );

  const handleDrag = useCallback(
    (event) => {
      //console.log('handleDrag: ', 'id: ', id, 'event: ',  event)
      // id: with randomized generator
      moveShape(id, event);
    },
    [id]
  );

  const handleTransform = useCallback(
    (event) => {
      //console.log('handleTransform: ','current', shapeRef.current, 'id', id, 'event', event  )
      transformPhotoShape(shapeRef.current, id, event);
    },
    [id]
  );

  return (
    <>
      <KonvaImage
        className='photo'
        onClick={handleSelect}
        onTap={handleSelect}
        image={image}
        onDragStart={handleSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={handleDrag}
        onTransformEnd={handleTransform}
      />
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
