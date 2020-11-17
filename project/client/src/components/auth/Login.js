import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {AuthContext} from '../../context';


const Login = ({ setOpen }) => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [errors, setErrors] = useState([])
    const { fetchWithCSRF, setCurrentUserId} = useContext(AuthContext);
    let history = useHistory();

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        loginUser(email, password);
    }

    const handleDemoSubmit = (e) => {
        e.preventDefault();
        loginUser("ian@aa.io", "password");
    }

    const handleClose = () => {
        setOpen(false)
    }

    async function loginUser(email, password) {
        const response = await fetchWithCSRF('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        })

        const responseData = await response.json();
        if (!response.ok) {
            setErrors(responseData.errors);
        } else {
            setOpen(false);
            setCurrentUserId(responseData.current_user_id)
            history.push('/')
        }
    }

    return (
        <div className='login__con'>
            <div className='sign-up login__dialog'>
                <div className='login__content'>
                    <button onClick={handleClose} className='exit-sign'>x</button>
                    <h1 className='sign-in__title login__title'>
                        Sign in
              </h1>
                    <div className='login__errors' id="form-dialog-title" onClose={handleClose}>
                        {errors.length ? errors.map((err) => <li key={err}>{err}</li>) : ''}
                    </div>
                    <div className='sign-form login__form'>
                        <label className='form-label' htmlFor="email">Email</label>
                        <input
                            className='sign-in__text login__text'
                            id="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleEmailChange}
                        />
                        <label className='form-label' htmlFor="password">Password</label>
                        <input
                            className='sign-in__text login__text'
                            id="password"
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className='login__btns'>
                        <button className='sign-form-btn login__btn left' onClick={handleSubmit}>login</button>
                        <button className='sign-form-btn login__btn' onClick={handleDemoSubmit}>Demo</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
