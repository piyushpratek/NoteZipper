import jwt from 'jsonwebtoken'

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET ?? '', {
    expiresIn: '30d',
  })
}
