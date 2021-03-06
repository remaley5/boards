import React, { useState, useEffect, useContext } from 'react';
import Canvas from './board/Canvas'
import Palette from './board/Palette';
import PropertiesPanel from './board/tools/PropertiesPanel'
const categories = ['images', 'text', 'shapes', 'pallets']

function Moodboard(props) {
    const [type, setType] = useState('images')
    const [newText, setNewText] = useState(false)

    const sketchbookId = parseInt(props.match.params.id, 10);
    const sketchbookTitle = props.match.params.title
    console.log('sketchbookId', sketchbookId)
    const title = props.match.params.title;

    const handleClick = e => {
        setType(e.target.value)
    }

    // const downloadURI = (uri, name) => {
    //     const link = document.createElement('a');
    //     link.download = name;
    //     link.href = uri;
    //     document.body.appendChild(link)
    //     link.click();
    //     document.body.removeChild(link);
    //     delete link;
    // }

    // const handleSave = () => {
    //     const dataURL = stage.toDataURL();
    //     downloadURI(dataURL, 'stage.png')
    // }

    return (
        <div className='moodboard'>
            <div className='moodboard-top' draggable='false'>
                <div className='moodboard-top__options'>
                    {categories.map((option, idx) => (
                        <button className='option' key={idx} onClick={handleClick} value={option}>{option}</button>
                    ))}
                </div>
                <div className='moodboard-top__content' draggable='false'>
                    <Palette type={type} setNewText={setNewText} newText={newText} />
                </div>
            </div>
            <div className='moodboard-body'>
                {/* <button id='save' onClick={handleSave}>Save as PNG</button> */}
                <Canvas sketchbookId={sketchbookId} sketchbookTitle={sketchbookTitle} title={title}/>
                <PropertiesPanel newText={newText} setNewText={setNewText}/>
            </div>
        </div>
    );
}
export default Moodboard;
