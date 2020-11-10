import React, { useRef, useCallback, useState } from "react";
import { Layer, Stage, Text } from "react-konva";

import {
  useShapes,
  clearSelection,
  createCircle,
  createRectangle,
  createPhoto,
  createText,
  saveDiagram,
  reset,
} from "./items/state";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "./items/constants";
import { Shape } from './items/Shape';

const handleDragOver = (event) => event.preventDefault();

const Canvas = () => {
  const shapes = useShapes((state) => Object.entries(state.shapes));
  //console.log('shapes', shapes) // Array(2)
  const [isDragging, setIsDragging] = useState(false)
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)
  const stageRef = useRef();
  const canvasRef = useRef();
  const layerRef = useRef();
  const [photos, setPhotos] = useState([])


  const handleDrop = useCallback((event) => {
    //console.log('handleDrop' )

    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);
    console.log('draggedData', draggedData )
    console.log('data keys', Object.keys(draggedData))
    // {“type”:"image","offsetX":54,"offsetY":62,"clientWidth":67,"clientHeight":78,"currentPhoto":"https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/WedNov41339252020.png","currentHeight":156,"currentWidth":134}
    // console.log('draggedData.clientWidth', draggedData['"clientWidth"'], 'clientHeight', draggedData.clientHeight)
    // console.log('draggedData.currentWidth', draggedData.currentWidth, 'currentHeight', draggedData.currentHeight)
    // undefined?

    if (draggedData) {
      const { offsetX, offsetY, type, clientHeight, clientWidth, currentPhoto, currentHeight, currentWidth } = JSON.parse(
        draggedData
      );

      console.log('photo', currentPhoto)

      stageRef.current.setPointersPositions(event);

      const coords = stageRef.current.getPointerPosition();
      // //console.log('coords', coords )

      if (type === SHAPE_TYPES.RECT) {
        // rectangle x, y is at the top,left corner
        createRectangle({
          x: coords.x - offsetX,
          y: coords.y - offsetY,
        });
      } else if (type === SHAPE_TYPES.CIRCLE) {
        // circle x, y is at the center of the circle
        createCircle({
          x: coords.x - (offsetX - clientWidth / 2),
          y: coords.y - (offsetY - clientHeight / 2),
        });
      } else if (type === SHAPE_TYPES.PHOTO) {
        setPhotos((state) => (
          [...state, currentPhoto]
          ))
        //console.log('currentPhoto: ', currentPhoto)
        //console.log('photos', photos)
        //console.log('currentHeight: ', currentHeight, 'currentWidth: ', currentWidth)
        //console.log('clientHeight: ', clientHeight, 'clientWidth: ', clientWidth)

        createPhoto({
          currentPhoto: currentPhoto,
          x: coords.x - offsetX,
          y: coords.y - offsetY,
          height: clientHeight,
          width: clientWidth
        });
      } else if (type === SHAPE_TYPES.TEXT) {
        createText({
          x: coords.x - offsetX,
          y: coords.y - offsetY,
          height: 100,
          width: 100
        });
      }
    }
  }, []);

  return (
    <main className="canvas" onDrop={handleDrop} onDragOver={handleDragOver} ref={canvasRef}>
      <div className="canvas__btns">
        <button className='canvas__btn' onClick={saveDiagram}>Save</button>
        <button className='canvas__btn' onClick={reset}>Reset</button>
      </div>
      <Stage
        ref={stageRef}
        width={800}
        height={window.innerHeight}
        onClick={clearSelection}
        className='stage'
      >
        <Layer ref={layerRef} className='layer'>
          {shapes.map(([key, shape ], i) => (
            <Shape key={key} shape={{ ...shape, id: key }} stage={stageRef} layer={layerRef}/>
          ))}
        </Layer>
      </Stage>
    </main>
  );
}

export default Canvas;
