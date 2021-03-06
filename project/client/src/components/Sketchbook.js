import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';

const Sketchbook = (props) => {
    const sketchbookId = parseInt(props.match.params.id, 10);
    const sketchbookTitle = props.match.params.title
    const [boards, setBoards] = useState(null)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('board title')
    const [loading, setLoading] = useState(true)
    const [currentBoard, setCurrentBoard] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api-sketchbook/boards/${sketchbookId}`)
            const data = await response.json()
            if (data.boards.length >= 1) {
                const boardsData = data.boards
                console.log(boardsData)
                const boards = []
                while(boardsData.length >= 1) {
                    const image = boardsData.pop()
                    console.log(image)
                    image.crossOrigin = 'Anonymous'
                    boards.push(image)
                }
                setBoards(boards)
                if (boards.length >= 1) {
                    setCurrentBoard(boards[0])
                }
            }
            setLoading(false)
        })()
    }, [sketchbookId])

    const handleChange = e => {
        setTitle(e.target.value)
    }

    const handleChoose = board => {
        setCurrentBoard(board)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle('board title')
    };

    // const handleDownload = () => {
    //     const uri = currentBoard.photo_url
    //     const name = `${currentBoard.name}.png`
    //     const link = document.createElement('a');
    //     link.download = name;
    //     link.href = uri;
    //     document.body.appendChild(link)
    //     link.click();
    //     document.body.removeChild(link);
    // }

    return (
        <div className='page'>
            <div className='page-header'>
                <div className='sketchbook-header'>{sketchbookTitle}</div>
                <div className='nav'>
                    <Nav />
                    <button onClick={handleOpen} className="add-btn">
                        +
				</button>
                </div>
            </div>
            {loading ? <div className='loading'>loading your boards...</div>:
            <div className='boards'>
                {boards ?
                    <div className='boards-sidebar'>
                       { boards.map((board) => (
                            <div className='board-container' onClick={() => handleChoose(board)}>
                            <img className='board-img' src={board.photo_url} alt={board.title} />
                            <div className='board-title'>{board.title}</div>
                        </div>
                        ))}
                </div> :
                    <div className='no-boards'>
                        <span className='no-boards__arrow'>&#8625;</span>
                        <div className='no-boards__text'>Add boards!</div>
                    </div>
                }
                {currentBoard ?
                    <div className='board-view'>
                        <div className='board-view__title'>{currentBoard.title}</div>
                        <img src={currentBoard.photo_url} alt={currentBoard.title} className='board-view__img' />
                    </div> : null}
            </div>}
            <dialog className='page-mask' onClose={handleClose} open={open}>
                <div className='dialog-content'>
                    <input className='dialog-header' onChange={handleChange} value={title} />
                    <div className='dialog-btns'>
                        <button className='close-dialog-btn dialog-btn' onClick={handleClose}>cancel</button>
                        <NavLink to={`/sketchbook/new-board/${sketchbookId}/${sketchbookTitle}`} className='close-dialog-btn dialog-btn'>create</NavLink>
                    </div>
                </div>
            </dialog>
        </div >
    )
}

export default Sketchbook;
