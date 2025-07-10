import type { JSX } from 'react'

const Header = (): JSX.Element => {
  return (
    <header className='flex flex-col items-center mt-15 px-4 text-center text-gray-800'>
      <img
        src="/images/header-img.jpg"
        alt="header image"
        className='w-50 h-50 rounded-full'
      />
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
        Hello! <img src="/icons/hand-wave-icon.png" className='w-8 aspect-square' alt="" />
      </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
        Welcome to our app
      </h2>
      <p className='mb-8 max-w-md'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam laboriosam neque architecto delectus hic pariatur vitae quasi aut nobis voluptatibus?</p>
      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>
        Get Started
      </button>
    </header>
  )
}

export default Header