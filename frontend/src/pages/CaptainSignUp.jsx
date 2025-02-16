import React from 'react'
import Uberpng from '../assets/pngegg.png'
import { NavLink } from 'react-router'
import { useState } from 'react'

function CaptainSignUp() {

  const [captainSignUpInfo, setCaptainSignUpInfo] = useState({
    firstname: '',
    lastname: '',
    captainEmail: '',
    captainPassword: '',
    confirmPassword: ''
  });

  const changeHandler = (e) => {
    setCaptainSignUpInfo({
      ...captainSignUpInfo,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (captainSignUpInfo.userPassword !== captainSignUpInfo.confirmPassword) {
      alert('Please enter the same password');
      return
    }
    console.log('user information:', captainSignUpInfo)

    setCaptainSignUpInfo({
      firstname: '',
      lastname: '',
      captainEmail: '',
      captainPassword: '',
      confirmPassword: ''
    })
  }

  return (
    <div className='min-h-screen w-full p-7 flex flex-col gap-7 justify-between '>
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
              value={captainSignUpInfo.firstname}
              onChange={(e) => changeHandler(e)}
              type='text'
              placeholder='Firstname'
              className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
            ></input>

            <input
              required
              name='lastname'
              value={captainSignUpInfo.lastname}
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
            name='captainEmail'
            value={captainSignUpInfo.captainEmail}
            onChange={(e) => changeHandler(e)}
            type='email'
            placeholder='vinay@example.com'
            className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
          ></input>

          <h3 className='text-xl mb-2 font-medium'>Enter Password</h3>

          <input
            required
            name='firtname'
            value={captainSignUpInfo.captainPassword}
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
            value={captainSignUpInfo.confirmPassword}
            onChange={(e) => changeHandler(e)}
            type='password'
            placeholder='password'
            className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
          ></input>

          <h3 className='text-xl mb-2 font-medium'>Vehicle Details</h3>

          <div className='flex gap-7 mb-7'>
            <div className=''>

              <p className='mb-2'>Color</p>

              <select
                required
                defaultValue={''}
                className='bg-[#eee] py-2 px-4 w-full rounded border border-gray-300 text-lg placeholder:text-base
                            focus:ring focus:ring-blue-300 focus:border-transparent'>
                {
                  ['Red', 'Blue', 'Green', 'Black'].map((color, idx) => {
                    return <option key={idx} className='text-xs font-semibold' value={color}>{color}</option>
                  })
                }
              </select>

            </div>

            <div className='basis-1/2'>

              <p className='mb-2'>Capcity</p>

              <select
                required
                defaultValue={''}
                className='bg-[#eee] py-2 px-4 w-full rounded border border-gray-300 text-lg placeholder:text-base
                            focus:ring focus:ring-blue-300 focus:border-transparent'
              >
                {
                  [1, 2, 3, 4, 5, 7].map((item, idx) => {
                    return <option key={idx} className='text-xs font-semibold' value={item}>{item}</option>
                  })
                }

              </select>
            </div>
          </div>
          <div className='flex gap-7 mb-7'>
            <div>

              <p className='mb-2'>Vehicle No.</p>
              <input
                required
                type=''
                placeholder='AB-00-CD-1893'
                className='bg-[#eee] py-2 px-4 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
              ></input>
            </div>
            <div className='basis-1/3'>
              <p className='mb-2'>Type.</p>
              <select
                required
                defaultValue={''}
                className='bg-[#eee] py-2 px-4 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
              >

                {
                  ['Auto', 'Car', 'Bike'].map((item, idx) => {
                    return <option key={idx} className='text-xs font-semibold' value={item}>{item}</option>
                  })
                }
              </select>
            </div>
          </div>

          <button
            type='submit'
            className='bg-[#111] text-white py-2 px-4 mb-7 w-full rounded text-xl font-semibold '>
            SignUp
          </button>


        </form>
        <p className='text-lg '>Already have account?
          <NavLink
            to={'/user/login'}
            className='ml-1 text-blue-500 font-medium active:text-blue-700'
          >
            Login here
          </NavLink>
        </p>
      </div>

      <div className='bg-green-400 p-3 rounded-md text-xl text-center font-bold text-white'>
        <NavLink to={'/user/register'} >
          <h3>SignUp as User</h3>
        </NavLink>
      </div>
    </div>
  )
}

export default CaptainSignUp
