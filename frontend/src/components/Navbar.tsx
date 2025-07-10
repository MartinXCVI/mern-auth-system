// React imports
import type { JSX } from 'react'
// React Router DOM
import { useNavigate } from 'react-router-dom'
// React icons
import { FiLogIn } from "react-icons/fi";


const Navbar = (): JSX.Element => {

  const navigate = useNavigate()

  return (
    <nav className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img
        src='/icons/logo.png'
        alt="logo"
        className='w-14 sm:w-18'
      />
      <button
        className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 cursor-pointer hover:bg-gray-100 transition-all'
        onClick={()=> navigate('/login')}
      >
        Login <FiLogIn />
      </button>
    </nav>
  )
}

export default Navbar