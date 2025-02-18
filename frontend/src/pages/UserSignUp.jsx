import React from 'react'
import Uberpng from '../assets/pngegg.png'
import { NavLink, useNavigate } from 'react-router'
import { useState } from 'react';
import { useRegisterUserMutation } from '../redux/api/userAPI';
import { useDispatch } from 'react-redux';
import { userExist } from '../redux/reducer/userReducer'

function UserSignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();
  const [userSignUpInfo, setUserSignUpInfo] = useState({
    firstname: '',
    lastname: '',
    userEmail: '',
    userPassword: '',
    confirmPassword: ''
  });

  const changeHandler = (e) => {
    setUserSignUpInfo({
      ...userSignUpInfo,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {

      if (userSignUpInfo.userPassword !== userSignUpInfo.confirmPassword) {
        alert('Please enter the same password');
        return
      }

      const newUser = {
        fullname: {
          firstname: userSignUpInfo.firstname,
          lastname: userSignUpInfo.lastname
        },
        email: userSignUpInfo.userEmail,
        password: userSignUpInfo.userPassword
      }

      const res = await registerUser(newUser).unwrap();
      dispatch(userExist({
        user: res.data.user,
        token: res.data.token,
      }))

      setUserSignUpInfo({
        firstname: '',
        lastname: '',
        userEmail: '',
        userPassword: '',
        confirmPassword: ''
      })

      navigate('/')
    } catch (err) {
      console.log('error while posting user information', err);
    }
  }

  return (
    <div className='min-h-screen w-full p-7 flex flex-col gap-7 justify-between'>
      <div>
        <img
          src={Uberpng} alt=''
          className='w-30'
        />
        <form
          onSubmit={(e) => submitHandler(e)}
        >

          <h3 className='text-xl mb-2 font-medium'>What's your name?</h3>
          <div className='flex gap-7'>
            <input
              required
              name='firstname'
              value={userSignUpInfo.firstname}
              onChange={(e) => changeHandler(e)}
              type='text'
              placeholder='Firstname'
              className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                    focus:ring focus:ring-blue-300 focus:border-transparent'
            ></input>
            <input
              required
              name='lastname'
              value={userSignUpInfo.lastname}
              onChange={(e) => changeHandler(e)}
              type='text'
              placeholder='Lastname'
              className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                    focus:ring focus:ring-blue-300 focus:border-transparent'
            ></input>
          </div>
          <h3 className='text-xl mb-2 font-medium'>Enter Email</h3>
          <input
            required
            name='userEmail'
            value={userSignUpInfo.userEmail}
            onChange={(e) => changeHandler(e)}
            type='email'
            placeholder='vinay@example.com'
            className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                    focus:ring focus:ring-blue-300 focus:border-transparent'
          ></input>
          <h3 className='text-xl mb-2 font-medium'>Enter Password</h3>
          <input
            required
            name='userPassword'
            value={userSignUpInfo.userPassword}
            onChange={(e) => changeHandler(e)}
            type='password'
            placeholder='password'
            className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                    focus:ring focus:ring-blue-300 focus:border-transparent'
          ></input>
          <h3 className='text-xl mb-2 font-medium'>Confirm Password</h3>
          <input
            required
            name='confirmPassword'
            value={userSignUpInfo.confirmPassword}
            onChange={(e) => changeHandler(e)}
            type='password'
            placeholder='password'
            className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                    focus:ring focus:ring-blue-300 focus:border-transparent'
          ></input>
          <button
            type='submit'
            className='bg-[#111] text-white py-2 px-4 mb-7 w-full rounded text-xl font-semibold '>
            SignUp
          </button>
        </form>
        <p className='text-lg'>Already have account?
          <NavLink
            to={'/user/login'}
            className='ml-1 text-blue-500 font-medium active:text-blue-700'
          >
            Login here
          </NavLink>
        </p>
      </div>
      <div className='bg-orange-400 p-3 rounded-md text-xl text-center font-bold text-white'>
        <NavLink to={'/captain/register'} >
          <h3>SignUp as Captain</h3>
        </NavLink>
      </div>
    </div>
  )
}

export default UserSignUp
