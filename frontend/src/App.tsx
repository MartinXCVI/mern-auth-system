// React imports
import type { JSX } from 'react'
// React router imports
import { Routes, Route } from 'react-router-dom'
// Pages components
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import EmailVerify from './pages/EmailVerify'
import PasswordReset from './pages/PasswordReset'


const App = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/password-reset' element={<PasswordReset />} />
      </Routes>
    </>
  )
}

export default App