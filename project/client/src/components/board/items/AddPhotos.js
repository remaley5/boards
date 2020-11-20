import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context'
import FolderPhoto from './FolderPhoto';
import { setPhotos } from './state';
import Upload from './../tools/Upload'

const AddPhotos = ({ setPhotoState }) => {
    const { currentUserId } = useContext(AuthContext);
    const [openDialog, setOpenDialog] = useState(false)
    const [folders, setFolders] = useState([])
    const [selectedPhotos, setSelectedPhotos] = useState({})
    const [currentPhotos, setCurrentPhotos] = useState([])
    const [currentFolderId, setCurrentFolderId] = useState(1)
    const [currentFolderIdx, setCurrentFolderIdx] = useState(0)
    const [loading, setLoading] = useState(false)

    const selectFolder = e => {
        const selected = folders[e.target.value].photos
        const id = folders[e.target.value].id
        const idx = e.target.value
        setCurrentFolderIdx(idx);
        setCurrentPhotos(selected);
        setCurrentFolderId(id)
    }

    useEffect(() => {
        async function loadPhotos() {
            const response = await fetch(`/api-photos/folders/${currentUserId}`)
            const data = await response.json();
            console.log('folders', data.folders)
            setFolders(data.folders)
            setCurrentPhotos(data.folders[currentFolderIdx].photos)
        }
        loadPhotos()
    }, [loading])

    const handleSave = () => {
        setPhotos(Object.values(selectedPhotos))
        setPhotoState(Object.values(selectedPhotos))
        setOpenDialog(false)

    }

    const handleOpen = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api-photos/folders/${currentUserId}`)
        const data = await response.json();
        console.log('folders', data.folders)
        setFolders(data.folders)

        setOpenDialog(true);
        console.log(data.folders[0].photos)
        setCurrentPhotos(data.folders[0].photos)
        setCurrentFolderId(data.folders[0].folder_info.id)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    return (
        <>
            <form className='content__add'>
                <button className='add-btn' onClick={handleOpen}>
                    +
            </button>
            </form>
            <dialog className='page-mask' open={openDialog}>
                <div className='dialog-content'>
                    <div className='images-dialog__header'>Select images for this board</div>
                    <div className='added__images'>
                        {Object.values(selectedPhotos).map((photo) => (
                            <button value={photo.id} className='photo__con'>
                                <img className='folder-photo' src={photo.photo_url} alt='board photo' />
                            </button>
                        ))}
                    </div>
                    <div className='folders__con'>
                        <div className='folder__con add'>
                            <button className='folder__description'>create new folder</button>
                            <div className='add-folder__btn'>+</div>
                        </div>
                        {folders.map((folder, i) => (
                            <div className='folder__con' style={{ backgroundColor: folder.folder_info.color }}>
                                <button value={i} onClick={selectFolder} className='folder__description'>{folder.folder_info.description}</button>
                                <div className='folder__title'>{folder.folder_info.title}</div>
                            </div>
                        ))}
                    </div>
                    <div className='photos__con select'>
                        <Upload currentFolderId={currentFolderId} setLoading={setLoading} />
                        {currentPhotos.map((photo) => (
                            <FolderPhoto photo={photo} setSelectedPhotos={setSelectedPhotos} selectedPhotos={selectedPhotos} />
                        ))}
                    </div>
                    <div className='dialog-btns'>
                        <button className='close-dialog-btn dialog-btn' onClick={handleClose}>cancel</button>
                        <button className='close-dialog-btn dialog-btn' onClick={handleSave}>save</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default AddPhotos;
