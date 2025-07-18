import type { JSX } from 'react'
// Components
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = (): JSX.Element => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar />
      <Header />
    </div>
  )
}

export default Home