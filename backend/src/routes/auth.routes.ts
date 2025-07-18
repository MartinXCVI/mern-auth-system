/* MODULE IMPORTS */
import { Router } from 'express'
/* CONTROLLERS IMPORTS */
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/auth.controllers.js'
/* MIDDLEWARE IMPORTS */
import userAuth from '../middlewares/userAuth.js'

// Router setup
const authRouter = Router()

/* GET routes */
// Check authentication
authRouter.get('/is-auth', userAuth, isAuthenticated)

/* POST routes */
// Registering a new user
authRouter.post('/register', register)
// Log in an existing user
authRouter.post('/login', login)
// Log out a user
authRouter.post('/logout', userAuth, logout)
// Send OTP verification
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp)
// Verify account
authRouter.post('/verify-email', userAuth, verifyEmail)
// Send reset password OTP
authRouter.post('/send-reset-otp', sendResetOtp)
// Reset user password
authRouter.post('/reset-password', resetPassword)

export default authRouter