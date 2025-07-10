// React imports & React hooks
import type { JSX } from 'react'
// React Router imports
import { useNavigate } from 'react-router-dom'
// Components
import LoginForm from '../components/Login/LoginForm'


const Login = (): JSX.Element => {

  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex justify-center items-center px-3 sm:px-0 bg-gradient-to-br from-green-200 to-emerald-400'>
      <img
        src="/icons/logo.png"
        alt=""
        className='absolute left-5 sm:left-20 top-5 w-12 sm:w-14 cursor-pointer'
        onClick={()=> navigate('/')}
      />
      <div className='w-full sm:w-96 bg-[#10241b] p-3 py-5 sm:p-10 rounded-lg shadow-lg text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          Login
        </h2>
        <p className='text-center text-sm mb-6'>
          Log in to your account
        </p>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login