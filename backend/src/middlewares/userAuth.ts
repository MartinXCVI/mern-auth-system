import { Response, NextFunction } from "express"
import { IRequestWithUser } from "../interfaces/IRequestWithUser.js"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js"


const userAuth = async (req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  // Getting access token from the request's cookies & validating
  const { accessToken } = req.cookies
  if(!accessToken) {
    res.status(401).json({
      success: false,
      message: "Unauthorized — Login again"
    })
    return
  }
  try {
    const tokenDecoded = jwt.verify(accessToken, JWT_SECRET)
    
    if(typeof tokenDecoded === 'object' && 'id' in tokenDecoded) {
      req.user = { id: tokenDecoded.id as string }
      next()
    } else {
      res.status(401).json({
        success: false,
        message: 'Unauthorized — Login again'
      })
    }
  } catch(error) {
    console.error(`Error on user authentication: ${error instanceof Error ? error.message : error}`)
    res.status(500).json({
      success: false,
      message: "Internal server error while attempting to authenticate user",
      error: error instanceof Error ? error.message : error
    })
  }
  return
}

export default userAuth