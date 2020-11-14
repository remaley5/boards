import React, { useContext, useState, useEffect } from 'react';
import Sketches from './home/Sketches'
import Nav from './Nav'
import { TextareaAutosize } from "@material-ui/core";
import {AuthContext} from '../context'



const Home = () => {
    const { fetchWithCSRF, currentUserId } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState('title');
    const [title, setTitle] = useState('Title')
    const [description, setDescription] = useState("description")
    const [color, setColor] = useState('rgb(247, 207, 207)');

    const options = ['title', 'description']

    const handleColor = e => setColor(e.target.value);

    const updateInput = e => {
        e.target.name === 'title' ?
            setTitle(e.target.value)
            : setDescription(e.target.value)
    }

    const handleOption = e => {
        setOption(e.target.value)
    }

    const handleOpen = () => {
        console.log('opening')
        setOpen(true);
    };

    const handleClose = () => {
        console.log('closing')
        setOpen(false);
    };

    const handleSave = async() => {
        const sketchbook = {
            title,
            color,
            description
        }
        let response = await fetchWithCSRF(`/api-sketchbook/new/${currentUserId}`, {
			method: 'POST',
			body: JSON.stringify(sketchbook),
        });

    }

    return (
        <div className='home'>
            <div className='nav'>
                <Nav />
                <button onClick={handleOpen} className="add-btn">
                    +
				</button>
            </div>
            <Sketches />
            <dialog className='page-mask' onClose={handleClose} open={open}>
                <div className='dialog-content'>
                    <div className='sketchbook-options' >
                        {options.map((opt) => (
                            <button value={opt} onClick={handleOption} className='sketchbook-option'>{opt}</button>

                        ))}
                    </div>
                    <div className='gap'>
                        <input className='color-picker' name="Color Picker" onChange={handleColor} value={color} type="color" />
                    </div>
                    <div className='dialog-preview' style={{ backgroundColor: color }}>
                        {option === 'title' ?
                            <TextareaAutosize
                                className="title-input"
                                aria-label="minimum height"
                                rowsMin={1}
                                placeholder='add title'
                                name='title'
                                value={title}
                                onChange={updateInput}
                            />
                            : option === 'description' ?
                                <TextareaAutosize
                                    className="description-input"
                                    aria-label="minimum height"
                                    rowsMin={1}
                                    name='description'
                                    value={description}
                                    onChange={updateInput}
                                />
                                : null
                        }
                    </div>
                    <div className='dialog-btns'>
                        <button className='close-dialog-btn dialog-btn' onClick={handleClose}>cancel</button>
                        <button className='close-dialog-btn dialog-btn' onClick={handleSave}>save</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Home;
