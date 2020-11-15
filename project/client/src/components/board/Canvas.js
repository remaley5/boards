import React, { useRef, useCallback, useState, useContext, useEffect } from "react";
import { Layer, Stage, Text } from "react-konva";
import { NavLink } from 'react-router-dom';
import useImage from 'use-image';
import {AuthContext} from '../../context'

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

const Canvas = ({sketchbookId, title}) => {
  const { fetchWithCSRF, currentUserId } = useContext(AuthContext);
  const shapes = useShapes((state) => Object.entries(state.shapes));
  //console.log('shapes', shapes) // Array(2)
  const [isDragging, setIsDragging] = useState(false)
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)
  const stageRef = useRef();
  const canvasRef = useRef();
  const layerRef = useRef();
  const [photos, setPhotos] = useState([])
  const [board, setBoard] = useState('')
  // const [photoFile, setPhotoFile] = useState(null);

  const handleDrop = useCallback((event) => {
    //console.log('handleDrop' )

    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);
    // {“type”:"image","offsetX":54,"offsetY":62,"clientWidth":67,"clientHeight":78,"currentPhoto":"https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/WedNov41339252020.png","currentHeight":156,"currentWidth":134}
    // console.log('draggedData.clientWidth', draggedData['"clientWidth"'], 'clientHeight', draggedData.clientHeight)
    // console.log('draggedData.currentWidth', draggedData.currentWidth, 'currentHeight', draggedData.currentHeight)
    // undefined?

    if (draggedData) {
      var { offsetX, offsetY, type, clientHeight, clientWidth, currentPhoto, currentHeight, currentWidth } = JSON.parse(
        draggedData
      );

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

//   const downloadURI = (uri, name) => {
//     const link = document.createElement('a');
//     link.download = name;
//     link.href = uri;
//     document.body.appendChild(link)
//     link.click();
//     document.body.removeChild(link);
//   }

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

	const handleSave = async(e) => {
    const dataURL = stageRef.current.toDataURL();
    const blob = dataURItoBlob(dataURL)
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("title", title)
    let response = await fetchWithCSRF(`/api-photos/sketchbook/${sketchbookId}`, {
			method: 'POST',
			body: formData,
		});
	};

	// useEffect(() => {
	// 	const formData = new FormData();
  //   formData.append("file", board);
  //   formData.append("title", title)
	// 	if(board){
	// 		postBoard(formData);
	// 	}
	// }, [board])


	// const postBoard = async (formData) => {
	// 	let response = await fetchWithCSRF(`/api-photos/sketchbook/${sketchbookId}`, {
	// 		method: 'POST',
	// 		body: formData,
	// 	});
	// 	if (response.ok) {
	// 		const data = await response.json()
	// 		setTimeout(() => {

	// 		}, 1000);
	// 	}
	// };


  return (
    <main className="canvas" onDrop={handleDrop} onDragOver={handleDragOver} ref={canvasRef}>
      <div className="canvas__btns">
        <NavLink to={`/sketchbook/${sketchbookId}`} className='canvas__btn' onClick={handleSave}>Save</NavLink>
        <button className='canvas__btn' onClick={reset}>Reset</button>
        <button id='save' className='canvas__btn' onClick={handleSave}>Download</button>

      </div>
      <Stage
        ref={stageRef}
        width={800}
        height={1200}
        onClick={clearSelection}
        className='stage'
      >
        <Layer ref={layerRef} className='layer'>
          {shapes.map(([key, shape], i) => (
            <Shape key={key} shape={{ ...shape, id: key }} stage={stageRef} layer={layerRef} />
          ))}
        </Layer>
      </Stage>
    </main>
  );
}

export default Canvas;
