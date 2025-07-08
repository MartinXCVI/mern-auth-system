/* ENVIRONMENT VARIABLES */
import { NODE_ENV, PORT_ENV } from './config/env.js'

/* SERVER SETUP */
import express from 'express'
import { Request, Response } from 'express'
import connectDB from './config/dbConnection.js'

const app = express()
const PORT = PORT_ENV || 3500
connectDB()

/* MIDDLEWARES */
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Parsing incoming requests with JSON
app.use(express.json())
// Parses incoming cookie headers into objects
app.use(cookieParser())
// Allowing CORS operations
app.use(cors({ credentials: true }))

console.log(`Mode: ${NODE_ENV}`)

/* API Endpoints */
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'

app.get('/', (req: Request, res: Response)=> { res.send("API Working") })
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

/* SERVER LISTENER */
app.listen(PORT, ()=> {
  console.log(`Server running on port: ${PORT}...`)
})