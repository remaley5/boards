import React, { useState, useEffect, useContext } from 'react';
// import Upload from './board/tools/Upload'
import Canvas from './board/Canvas'
import Palette from './board/Palette';
import PropertiesPanel from './board/tools/PropertiesPanel'
// import cherub_one from '../images/cherub.jpeg'
// import cherub_two from '../images/cherub2.jpeg'
// import cherub_three from '../images/cherubs3.jpg'
const categories = ['images', 'text', 'shapes', 'pallets']

function Moodboard() {
    const [type, setType] = useState('images')

    const handleClick = e => {
        setType(e.target.value)
    }

    return (
        <div className='moodboard'>
            <div className='moodboard-top' draggable='false'>
                <div className='moodboard-top__options'>
                    {categories.map((option, idx) => (
                        <button className='option' key={idx} onClick={handleClick} value={option}>{option}</button>
                    ))}
                </div>
                <div className='moodboard-top__content' draggable='false'>
                    <Palette type={type}/>
                </div>
            </div>
            <div className='moodboard-body'>
                <Canvas />
                <PropertiesPanel />
            </div>
        </div>
    );
}
export default Moodboard;
