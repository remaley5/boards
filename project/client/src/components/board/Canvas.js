import React, { useRef, useCallback, useState, useContext, useEffect } from "react";
import { Layer, Stage, Text } from "react-konva";
import { NavLink, useHistory } from 'react-router-dom';
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

const Canvas = ({sketchbookId, sketchbookTitle, title}) => {
  const { fetchWithCSRF, currentUserId } = useContext(AuthContext);
  const shapes = useShapes((state) => Object.entries(state.shapes));
  const history = useHistory()
  //console.log('shapes', shapes) // Array(2)
  const [isDragging, setIsDragging] = useState(false)
  const stageRef = useRef();
  const canvasRef = useRef();
  const layerRef = useRef();
  const [photos, setPhotos] = useState([])

  const handleDrop = useCallback((event) => {

    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);

    if (draggedData) {
      var { offsetX, offsetY, type, clientHeight, clientWidth, currentPhoto } = JSON.parse(
        draggedData
      );
      stageRef.current.setPointersPositions(event);
      const coords = stageRef.current.getPointerPosition();

      if (type === SHAPE_TYPES.RECT) {
        createRectangle({
          x: coords.x - offsetX,
          y: coords.y - offsetY,
        });
      } else if (type === SHAPE_TYPES.CIRCLE) {
        createCircle({
          x: coords.x - (offsetX - clientWidth / 2),
          y: coords.y - (offsetY - clientHeight / 2),
        });
      } else if (type === SHAPE_TYPES.PHOTO) {
        setPhotos((state) => (
          [...state, currentPhoto]
        ))

        createPhoto({
          currentPhoto: currentPhoto,
          x: coords.x - offsetX,
          y: coords.y - offsetY,
          height: clientHeight,
          width: clientWidth
        });
      }
    }
  }, []);

  const downloadURI = () => {
    const uri = stageRef.current.toDataURL()
    const name = `${title}.png`
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link);
  }

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
    console.log('sketchBookId in Canvas', sketchbookId)
    console.log('typof', (typeof sketchbookId))
    let response = await fetchWithCSRF(`/api-photos/sketchbook/${sketchbookId}`, {
			method: 'POST',
			body: formData,
    });
    alert('saving....')
    history.push(`/sketchbook/${sketchbookId}/${sketchbookTitle}`)
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
        <button className='canvas__btn' onClick={handleSave}>Save</button>
        <button className='canvas__btn' onClick={reset}>Reset</button>
        <button id='save' className='canvas__btn' onClick={downloadURI}>Download</button>

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
