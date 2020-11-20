import React, { useState} from 'react';

const FolderPhoto = ({ photo, setSelectedPhotos, selectedPhotos }) => {

    const handleClick = () => {
        const id = photo.id
        const selected = Object.values(selectedPhotos).includes(photo)

        if (selected)  {
            delete selectedPhotos[id];
            setSelectedPhotos({...selectedPhotos})
        } else {
            selectedPhotos[id] = photo
            setSelectedPhotos({...selectedPhotos})
        }
    }

    return (
        <button className='photo__con' onClick={handleClick}>
            <div className={Object.values(selectedPhotos).includes(photo) ? 'folder-photo star' : 'folder-photo hidden star' }>&#9733;</div>
            <img className={Object.values(selectedPhotos).includes(photo) ? 'photo-selected folder-photo' : 'folder-photo' } src={photo.photo_url} alt='board photo' />
        </button>
    )
}

export default FolderPhoto;
