/* MODULE IMPORTS */
import { Router } from 'express'
/* CONTROLLERS IMPORTS */
import { isAuthenticated, login, logout, register, sendVerifyOtp, verifyEmail } from '../controllers/auth.controllers.js'
/* MIDDLEWARE IMPORTS */
import userAuth from '../middlewares/userAuth.js'

// Router setup
const authRouter = Router()

/* POST routes */
// Registering a new user
authRouter.post('/register', register)
// Log in an existing user
authRouter.post('/login', login)
// Log out a user
authRouter.post('/logout', logout)
// Send OTP verification
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp)
// Verify account
authRouter.post('/verify-email', userAuth, verifyEmail)
// Check authentication
authRouter.post('/is-auth', userAuth, isAuthenticated)

export default authRouter