import './App.css'
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Start from './pages/Start'
import UserLogin from './pages/user/UserLogin';
import UserSignUp from './pages/user/UserSignUp';
import CaptainSignUp from './pages/captain/CaptainSignUp';
import CaptainLogin from './pages/captain/CaptainLogin';
import ProtectRoutes from './components/ProtectRoutes'
import CaptainHome from './pages/captain/CaptainHome';
import UserHome from './pages/user/UserHome';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/user/register' element={<UserSignUp />} />
        <Route path='/captain/login' element={<CaptainLogin />} />
        <Route path='/captain/register' element={<CaptainSignUp />} />

        <Route path='/user/home' element={<UserHome />} />
        <Route path='/captain/home' element={<CaptainHome />} />

      </Routes>
    </div>
  )
}

export default App
