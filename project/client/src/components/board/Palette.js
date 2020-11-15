import React, { useContext } from "react";
import { PhotoContext } from '../../context'
import Upload from '../board/tools/Upload'
import TextEditor from './tools/TextEditor'

import { DRAG_DATA_KEY, SHAPE_TYPES } from "./items/constants";


const Palette = ({ type }) => {
  const { photos } = useContext(PhotoContext)

  const handleDragStart = (event) => {
    //console.log('handleDragStart')
    // //console.log('DRAG_DATA_KEY, SHAPE_TYPES', DRAG_DATA_KEY, SHAPE_TYPES)
    let currentHeight = null
    let currentPhoto = null
    let currentWidth = null
    const type = event.target.dataset.shape;
    // //console.log('type', type)
    //console.log('target', event.target.name)
    if (type) {
      if(type === 'image') {
        currentWidth = event.target.width * 2
        currentHeight = event.target.height * 2
        currentPhoto = event.target.src
      }

      // x,y coordinates of the mouse pointer relative to the position of the padding edge of the target node
      const offsetX = event.nativeEvent.offsetX;
      const offsetY = event.nativeEvent.offsetY;
      //console.log('event.nativeEvent: ', event.nativeEvent)
      //console.log('event.nativeEvent.offset height: ', event.nativeEvent.srcElement.clientHeight, 'width: ',  event.nativeEvent.srcElement.clientWidth)
      // dataTransfer: empty
      // attributes:  nodeType, clientHeight, clientWidth, naturalHeight, naturalWidth

      // //console.log('event.nativeEvent.path', event.nativeEvent.path)
      //console.log('event.nativeEvent.srcElement', event.nativeEvent.srcElement)
      //<img src='...', class, data-shape='image', name='photo-3', draggable>

      // dimensions of the node on the browser
      const clientWidth = event.target.clientWidth;
      const clientHeight = event.target.clientHeight;
      //console.log('currentHeight: ', currentHeight, 'currentWidth: ', currentWidth)
      //console.log('clientWidth: ', clientWidth, 'clientHeight: ', clientHeight)

      const dragPayload = JSON.stringify({
        type,
        offsetX,
        offsetY,
        clientWidth,
        clientHeight,
        currentPhoto,
        currentHeight,
        currentWidth
      });
      //console.log('dragPayload', dragPayload)
      // {“type”:"image","offsetX":54,"offsetY":62,"clientWidth":67,"clientHeight":78,"currentPhoto":"https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/WedNov41339252020.png","currentHeight":156,"currentWidth":134}
      //console.log('dragPayload clientHeight: ', dragPayload['clientHeight'], 'clientWidth: ', dragPayload.clientWidth)
      // undefined ?

      event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
    }
  };

  return (
    <>
      { (type === 'images') ?
        <aside className='moodboard-top__content'>
          <div className='top__photos'>
            <Upload />
            {photos.map((url, idx) => (
              <div className='top__item' key={url}>
                <img
                  crossOrigin='Anonymous'
                  src={url}
                  name={`photo-${idx}`}
                  className="top__img"
                  data-shape={SHAPE_TYPES.PHOTO}
                  draggable
                  onDragStart={handleDragStart}
                />
              </div>
            ))}
          </div>
        </aside>
        : type === 'shapes' ?
          <aside className='moodboard-top__content'>
            <div className='top__photos'>
              <div
                className="shape rectangle"
                data-shape={SHAPE_TYPES.RECT}
                draggable
                onDragStart={handleDragStart}
              />
              <div
                className="shape circle"
                data-shape={SHAPE_TYPES.CIRCLE}
                draggable
                onDragStart={handleDragStart}
              />
            </div>
          </aside> : type === 'text' ?
            <aside className='moodboard-top__content'>
              <div className='top__photos'>
                <div
                  className='text'
                  data-shape={SHAPE_TYPES.TEXT}
                  draggable
                  onDragStart={handleDragStart}><div className='text_t'>T</div></div>
              </div>
            </aside>
      : null }
    </>
  );
}

export default Palette;
