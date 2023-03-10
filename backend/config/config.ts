import dotenv from 'dotenv'
import logger from './logger'

// NOTE: Always check if `NODE_ENV` before anything else
if (typeof process.env.NODE_ENV === 'undefined') {
  throw new Error(
    'Please define Your `NODE_ENV` variable using `cross-env` in package.json file'
  )
}

let envPath = ''
if (process.env.NODE_ENV === 'production') {
  envPath = '.env'
}
if (process.env.NODE_ENV === 'development') {
  envPath = '.env.development'
}
if (process.env.NODE_ENV === 'test') {
  envPath = '.env.test'
}
if (envPath === '') {
  logger.error('Please use a valid value of NODE_ENV variable.')
  throw new Error()
}

dotenv.config({ path: envPath })

if (typeof process.env.MONGO_URI === 'undefined') {
  throw new Error('Please define MONGO_URI in your .env file.')
}
if (typeof process.env.JWT_SECRET === 'undefined') {
  throw new Error(' Please define JWT_SECRET in your .env file.')
}

export const MONGO_URI = process.env.MONGO_URI
export const JWT_SECRET = process.env.JWT_SECRET
export const NODE_ENV = process.env.NODE_ENV
