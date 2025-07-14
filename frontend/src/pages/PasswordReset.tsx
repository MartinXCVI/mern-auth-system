// React imports
import type { JSX } from 'react'
// React Router DOM
import { useNavigate } from 'react-router-dom'
// Components
import PasswordResetForm from '../components/PasswordReset/PasswordResetForm'


const PasswordReset = (): JSX.Element => {

  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex justify-center items-center px-3 sm:px-0 bg-gradient-to-br from-green-200 to-emerald-400'>
      <img
        src="/icons/logo.png"
        alt=""
        className='absolute left-5 sm:left-20 top-5 w-12 sm:w-14 cursor-pointer'
        onClick={()=> navigate('/')}
      />
      <PasswordResetForm />
    </div>
  )
}

export default PasswordReset