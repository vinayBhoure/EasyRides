import './App.css'
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import UserLogin from './pages/UserLogin';
import UserSignUp from './pages/UserSignUp';
import CaptainSignUp from './pages/CaptainSignUp';
import CaptainLogin from './pages/CaptainLogin';

const App = () => {
  return (
    <div className=''>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user/login' element={<UserLogin />} />
      <Route path='/user/register' element={<UserSignUp />} />
      <Route path='/captain/login' element={<CaptainLogin />} />
      <Route path='/captain/register' element={<CaptainSignUp />} />
      
    </Routes>
    </div>
  )
}

export default App
