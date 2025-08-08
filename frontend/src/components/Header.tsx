// React imports
import { type JSX } from 'react'
// Context-related imports
import { useAppContext } from '../context/hooks/useAppContext'
// React Router DOM
import { useNavigate } from 'react-router-dom'

const Header = (): JSX.Element => {

  const { userData } = useAppContext()

  const navigate = useNavigate()

  return (
    <header className='flex flex-col items-center mt-15 px-4 text-center text-gray-800'>
      <img
        src="/images/header-img.jpg"
        alt="header image"
        className='w-50 h-50 rounded-full'
      />
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Hello, {userData ? userData.name : 'Stranger'}! <img src="/icons/hand-wave-icon.png" className='w-8 aspect-square' alt="" />
      </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
        Welcome To Our App
      </h2>
      <p className='mb-8 max-w-md'>
        Log in to access your account, or sign up if you're new. Verify your email after registration, and reset your password with a secure OTP if you ever forget your credentials.
      </p>
      <button
        className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all cursor-pointer'
        onClick={()=> navigate('/login')}
      >
        Get Started
      </button>
    </header>
  )
}

export default Header