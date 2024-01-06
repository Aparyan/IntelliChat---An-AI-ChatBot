import React from 'react'
import '../styles/Navbar.css';

export default function InnerNavbar() {
    const logoutHandler = () => {
        localStorage.setItem('username', null);
        window.location = 'http://localhost:3000/';
    }
    return (
        <div className='navbar'>
            <svg className='navbar-icon' width="66px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.4615 20H4C3.44772 20 3 19.5523 3 19V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V11.3846" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 14H10" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 10H13" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="16.5" cy="15.5" r="2.5" stroke="#ffffff" stroke-width="2"></circle> <path d="M18.5 17.5L21.5 20.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> </g></svg>
            <div className='logout-container'>
                <button onClick={logoutHandler} className='logout'>Logout</button>
            </div>

        </div >
    )
}