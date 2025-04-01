import './App.css'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from './pages/Start'
import UserLogin from './pages/user/UserLogin';
import UserSignUp from './pages/user/UserSignUp';
import CaptainSignUp from './pages/captain/CaptainSignUp';
import CaptainLogin from './pages/captain/CaptainLogin';
import ProtectRoutes from './components/ProtectRoutes'
import CaptainHome from './pages/captain/CaptainHome';
import UserHome from './pages/user/UserHome';
import Test from './pages/Test';
import { useDispatch } from 'react-redux';

import { userExist } from './redux/reducer/userReducer';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import store from './redux/store';
import ErrorBoundary from './components/ErrorBoundary';
import CaptainRiding from './pages/captain/CaptainRiding';

const App = () => {

  return (
    // <Provider store={store}>
    <RecoilRoot>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Start />} />
            <Route path='/user/login' element={<UserLogin />} />
            <Route path='/user/register' element={<UserSignUp />} />
            <Route path='/captain/login' element={<CaptainLogin />} />
            <Route path='/captain/register' element={<CaptainSignUp />} />
            <Route path='/user/home' element={
              <ErrorBoundary>
                <UserHome />
              </ErrorBoundary>
            } />
            <Route path='/captain/home' element={<CaptainHome />} />
            <Route path='/captain/riding/' element={<CaptainRiding />} />
            <Route path='/test' element={<Test />} />
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
    // </Provider>
  )
}

export default App
