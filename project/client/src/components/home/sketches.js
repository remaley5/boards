import React from 'react';
import { NavLink } from 'react-router-dom';


const Sketches = () => {

    return (
        <>
        <div className='sketches__con'>
            <div className='sketch__con'>
                <div className='sketch__title'><NavLink to='/moodboard' className='sketch-link'>tester title</NavLink></div>
            </div>
            <div className='sketch__con'>
                <div className='sketch__title'>title</div>
            </div>
            <div className='sketch__con'>
                <div className='sketch__title'>title</div>
            </div>
            <div className='sketch__con'>
                <div className='sketch__title'>title</div>
            </div>
            <div className='sketch__con'>
                <div className='sketch__title'>title</div>
            </div>
        </div>
        </>
    )
}

export default Sketches;
