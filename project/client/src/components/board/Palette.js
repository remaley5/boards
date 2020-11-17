import React, { useContext, useState, useEffect} from "react";
import { AuthContext } from '../../context'
import Upload from '../board/tools/Upload'
import { DRAG_DATA_KEY, SHAPE_TYPES } from "./items/constants";
import { useShapes, updateAttribute } from "../../components/board/items/state";

const Palette = ({ type, setNewText, newText }) => {
  // const { photos } = useContext(PhotoContext)
  const { currentUserId } = useContext(AuthContext);
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)

  const handleNewText = () => {
    setNewText(true)
    console.log('setNewText', newText)
  }

  const handleDragStart = (event) => {
    let currentHeight = null
    let currentPhoto = null
    let currentWidth = null
    const type = event.target.dataset.shape;
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

      event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
    }
  };

  useEffect(() => {
    if (!loading) (
      (async () => {
        const res = await fetch(`/api-photos/${currentUserId}`)
        const data = await res.json();
        setPhotos(data)
      })())
  }, [loading])

  return (
    <>
      { (type === 'images') ?
        <aside className='moodboard-top__content'>
          <div className='top__photos'>
            <Upload setLoading={setLoading} />
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
                <div className='text'>
                  <button onClick={handleNewText} className='text_t'>T</button>
                </div>
              </div>
            </aside>
            : null}
    </>
  );
}

export default Palette;
