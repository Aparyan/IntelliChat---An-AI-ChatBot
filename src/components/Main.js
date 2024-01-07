import React from 'react'
import '../styles/Main.css';
import { useState } from 'react';
import axios from 'axios';

export default function Main() {
    const [ email, setEmail ] = useState('');
    const [ pass, setPass ] = useState('');

    let emailChange = (e) => {
        setEmail(e.target.value);
    }
    let passwordChange = (e) => {
        setPass(e.target.value);
    }
    let loginHandler = async (e) => {
        e.preventDefault();
        if (email === '' || pass === '') {
            alert("Please enter your login credentials!!");
            return;
        }
        let Email = email;
        await axios.post("https://intellichat-szoj.onrender.com/login", {
            data: {
                email: Email,
                password: pass
            }
        }).then(res => {
            localStorage.setItem('username', res.data.username);
            if (res.data.username !== null)
                window.location = 'https://singular-duckanoo-dc7620.netlify.app/speech';
            else
                window.location = 'https://singular-duckanoo-dc7620.netlify.app/';
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='main'>
            <div className="left-text">
            <svg width="216px" height="216px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.4615 20H4C3.44772 20 3 19.5523 3 19V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V11.3846" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 14H10" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 10H13" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="16.5" cy="15.5" r="2.5" stroke="#ffffff" stroke-width="2"></circle> <path d="M18.5 17.5L21.5 20.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                <h2 className="first-text">
                    Welcome to
                </h2>
                <h2 className="second-text">
                    IntelliChat - An AI ChatBot
                </h2>
            </div>
            <form className="right-text">
                <div className="signup-container">
                    <h2 className="signup-heading">
                        Signup / Login
                    </h2>
                    <div className='signup-label-container'>
                        <label className='signup-label' htmlFor="email">Your Email ID</label>
                    </div>
                    <div className="input-container">
                        <input value={email} onChange={emailChange} required="true" className='signup-input' type="email" name="email" id="email"/>
                    </div>
                    <div className='signup-label-container'>
                        <label className='signup-label ' htmlFor="password">Password</label>
                    </div>
                    <div className="input-container">
                        <input value={pass} onChange={passwordChange} required="true" className='signup-input' type="password" name="password" id="password" />
                    </div>
                    <div className="button-container">
                        <button onClick={loginHandler} className='signup-button' type='submit'>Lets Go!!</button>
                    </div>
                </div>
            </form>
        </div>
    )
}