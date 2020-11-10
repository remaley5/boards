import React, { useState, useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import {AuthContext} from '../context';
import Login from './auth/Login'


const Landing = () => {
    let [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    return (
        <div className='landing'>
            <div className='landing__body'>
                <div className='landing__title'>boards</div>
                <div className='landing__btns'>
                    <button className='login__btn landing__btn' onClick={handleOpen}>Sign in</button>
                <NavLink
                    variant="contained"
                    to="/signup"
                    className='signup__btn landing__btn'>
                        I'm new
                </NavLink>
                </div>
            </div>
            <dialog className='landing__dialog page-mask' open={open}>
                <Login setOpen={setOpen} />
            </dialog>
        </div>
    )
}

export default Landing;
