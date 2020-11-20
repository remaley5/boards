import React, { useContext, useState, useEffect} from "react";
import { AuthContext } from '../../context'
import Upload from '../board/tools/Upload'
import {getPhotos} from './items/state';
import AddPhotos from "./items/AddPhotos";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "./items/constants";
import { Photo } from "./items/Photo";
const folder_id = 1;

const Palette = ({ type, setNewText, newText }) => {
  // const { photos } = useContext(PhotoContext)
  const { currentUserId } = useContext(AuthContext);
  const [photos, setPhotos] = useState([])
  const [load, setLoad] = useState(false)

  const handleNewText = () => {
    setNewText(true)
    console.log('setNewText', newText)
  }

  const handleDragStart = (event) => {
    let currentHeight = null
    let currentPhoto = null
    let currentWidth = null

    const type = event.target.dataset.shape;
    console.log('draggging ....', type)
    if (type) {
      if (type === 'image') {
        currentWidth = event.target.width * 2
        currentHeight = event.target.height * 2
        currentPhoto = event.target.src
      }

      const offsetX = event.nativeEvent.offsetX;
      const offsetY = event.nativeEvent.offsetY;

      const clientWidth = event.target.clientWidth;
      const clientHeight = event.target.clientHeight;

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
      console.log(dragPayload);
      event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
    }
  };

  useEffect(() => {
    const gotPhotos = getPhotos()
    setPhotos(gotPhotos)
    console.log('GOT PHOTOS', gotPhotos)
    // if (!loading) (
    //   (async () => {
    //     const res = await fetch(`/api-photos/${folder_id}`)
    //     const data = await res.json();
    //     setPhotos(data)
    //   })())
  }, [])

  return (
    <>
      { (type === 'images') ?
        <aside className='moodboard-top__content'>
          <div className='top__photos'>
            <AddPhotos setPhotoState={setPhotos}/>
            {photos.map((photo, idx) => (
              <div className='top__item' key={photo.photo_url}>
                <img
                  crossOrigin='Anonymous'
                  src={photo.photo_url}
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
                <div className='text'>
                  <button onDragStart={handleDragStart} data-shape={SHAPE_TYPES.TEXT} draggable className='text_t'>T</button>
                </div>
              </div>
            </aside>
            : null}
    </>
  );
}

export default Palette;
