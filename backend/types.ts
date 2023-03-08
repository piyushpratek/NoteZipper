import type { Request } from 'express'
import { UserType } from './models/userModel'

export interface RequestAuth extends Request {
  user?: UserType
}

export interface CustomRequest<T> extends Request {
  body: T
  user?: UserType
}
