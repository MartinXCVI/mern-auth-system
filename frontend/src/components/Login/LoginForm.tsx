// React & React hooks imports
import type { JSX } from 'react'
import { useState } from 'react';
import type { ChangeEvent } from 'react';
// React Router imports
import { useNavigate } from 'react-router-dom';
// React icons
import { BsEnvelope } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";


const LoginForm = (): JSX.Element => {

  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <>
      <form action="">
        {/* EMAIL INPUT */}
        <div className='w-full flex items-center gap-3 mb-4 px-4 py-2.5 rounded-full bg-gray-800'>
          <label htmlFor="email-login" className='min-w-[35%] flex items-center gap-1'>
            <BsEnvelope aria-hidden="true" /> Email
          </label>
          <input
            type="email"
            id="email-login"
            className='bg-transparent outline-none'
            placeholder='Enter your email'
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value)}
            value={email}
            required
          />
        </div>
        {/* PASSWORD INPUT */}
        <div className='w-full flex items-center gap-3 mb-4 px-4 py-2.5 rounded-full bg-gray-800'>
          <label htmlFor="password-login" className='min-w-[35%] flex items-center gap-1'>
            <IoIosLock aria-hidden="true" /> Password
          </label>
          <input
            type="password"
            id="password-login"
            className='bg-transparent outline-none'
            placeholder='Enter your password'
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value)}
            value={password}
            required
          />
        </div>
        <p
          className='w-fit text-emerald-400 cursor-pointer mb-4'
          onClick={()=> navigate('/password-reset')}
        >
          Forgot password?
        </p>
        <button
          type='submit'
          className='w-full flex justify-center items-center gap-1 py-2.5 rounded-full text-gray-200 bg-gradient-to-l from-teal-500 to-emerald-600 font-medium'
        >
          Login <FiLogIn aria-hidden="true" />
        </button>
      </form>
      <p className='text-start text-gray-400 text-xs mt-4'>
        Don't have an account? —{' '}
        <span
          role='button'
          onClick={()=> navigate('/register')}
          className='text-emerald-400 cursor-pointer underline'
        >
          Sign Up
        </span>
      </p>
    </>
  )
}

export default LoginForm