import React from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import { Navigate } from "react-router-dom";

export default function Login({ authorized }) {
    if (authorized) {
        return <Navigate to='/speech' />
    }
    return (
        <div className='app'>
            <Navbar></Navbar>
            <Main></Main>
        </div>
    )
}