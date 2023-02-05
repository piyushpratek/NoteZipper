import jwt from 'jsonwebtoken'
import User, { UserType } from '../models/userModel'
import asyncHandler from 'express-async-handler'
import type { RequestAuth } from '../types'
import { JWT_SECRET } from '../config'

interface JwtPayload {
  id: string
}

//  Protect The Api From Unauthorised access
export const protect = asyncHandler(async (req: RequestAuth, res, next) => {
  let token: string

  if (req.headers.authorization?.startsWith('Bearer') === true) {
    try {
      token = req.headers.authorization.split(' ')[1]
      // decodes token id
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

      req.user = (await User.findById(decoded.id).select(
        '-password'
      )) as unknown as UserType

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})
