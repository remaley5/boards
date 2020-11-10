import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../context';
import { NavLink } from 'react-router-dom';


const Nav = () => {
    const { setCurrentUserId, currentUserId, fetchWithCSRF } = useContext(AuthContext);
    const logoutUser = async () => {
        const response = await fetchWithCSRF('/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if(response.ok) {
            setCurrentUserId(null)
        }
    }

    return (
        <div className='nav'>
            <NavLink to='/'><button className='nav-link home-link'>sophie</button></NavLink>
            <button onClick={logoutUser} className='nav-link logout-link'>Logout</button>
            <NavLink to='/moodboard'><button className='nav-link test-link'>moodboard</button></NavLink>
        </div>
    )
}

export default Nav;
