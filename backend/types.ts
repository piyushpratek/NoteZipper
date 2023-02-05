import type { Request } from 'express'
import type { Types } from 'mongoose'
import { UserType } from './models/userModel'

export interface RequestAuth extends Request<Types.ObjectId> {
  user?: UserType
}

export interface CustomRequest<T> extends Request<Types.ObjectId> {
  body: T
  user?: UserType
}
