import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context'

const Sketches = () => {
    const [sketchbooks, setSketchbooks] = useState([]);
    const { currentUserId } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api-sketchbook/${currentUserId}`)
            const data = await response.json()
            setSketchbooks(data.sketchbooks)
        })()
    }, [currentUserId]);

    return (
        <>
            <div className='sketches__con'>
                {sketchbooks.length >=1 ?
                <>
                {sketchbooks.map((sketchbook) => (
                    <div className='sketch__con' style={{ backgroundColor: sketchbook.color }}>
                        <NavLink to={`/sketchbook/${sketchbook.id}/${sketchbook.title}`} className='sketch__description'>{sketchbook.description}</NavLink>
                        <div className='sketch__title'>{sketchbook.title}</div>
                    </div>
                ))}
                </> : <div className='no-boards'>
                        <span className='no-boards__arrow'>&#8625;</span>
                        <div className='no-boards__text'>Add books!</div>
                    </div>
                }
            </div>
        </>
    )
}

export default Sketches;
