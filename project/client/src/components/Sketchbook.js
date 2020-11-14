import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';

const Sketchbook = (props) => {
    const sketchbookId = parseInt(props.match.params.id, 10);
    const [boards, setBoards] = useState(null)
    const [open, setOpen] = useState(true)
    const [title, setTitle] = useState('')

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api-sketchbook/boards/${sketchbookId}`)
            const data = await response.json()
            if (data.length >= 1) {
                setBoards(data.boards)
            }
        })()
    }, [sketchbookId])

    const handleChange = e => {
        setTitle(e.target.value)
    }

    const handleSave = async() => {
        console.log(title)
        // const sketchbook = {
        //     title,
        //     color,
        //     description
        // }
        // let response = await fetchWithCSRF(`/api-sketchbook/new/${currentUserId}`, {
		// 	method: 'POST',
		// 	body: JSON.stringify(sketchbook),
        // });
    }

    const handleOpen = () => {
        console.log('opening')
        setOpen(true);
    };

    const handleClose = () => {
        console.log('closing')
        setOpen(false);
    };

    return (
        <div className='sketchbook-page'>
            <div className='nav'>
                <Nav />
                <button onClick={handleOpen} className="add-btn">
                    +
				</button>
            </div>
            { boards ?
                boards.map((board) => (
                    <div className='board-container'>
                        <img className='board-img' src={board.photo_url} alt={board.title} />
                        <div className='board-title'>{board.title}</div>
                    </div>
                )) : <div>you have no boards.</div>
            }
            <dialog className='page-mask' onClose={handleClose} open={open}>
            <div className='dialog-content'>
                <input className='dialog-header' onChange={handleChange} value={title}/>
                <button className='close-dialog-btn dialog-btn' onClick={handleClose}>cancel</button>
                <button className='close-dialog-btn dialog-btn' onClick={handleSave}>save</button>
                </div>
            </dialog>
        </div>
    )
}

export default Sketchbook;
