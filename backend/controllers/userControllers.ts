import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { generateToken } from '../utils/generateToken'
import type { Request, Response } from 'express'

interface UserType {
  name: string
  email: string
  password: string
  pic: string
}

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, pic } = req.body as UserType

  const userExists = await User.findOne({ email })

  if (userExists != null) {
    res.status(400)
    throw new Error('User Already Exists')
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
      pic,
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.IsAdmin,
      pic: user.pic,
      token: generateToken(user._id.toString()),
    })
  } catch (error) {
    res.status(400)
    throw new Error('Error Ocurred! ')
  }
})
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body as UserType

  const user = await User.findOne({ email })

  if (user != null && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.IsAdmin,
      pic: user.pic,
      token: generateToken(user._id.toString()),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Email or Password! ')
  }
})

export default registerUser
