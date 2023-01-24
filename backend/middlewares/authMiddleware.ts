import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import asyncHandler from 'express-async-handler';

interface JwtPayload {
  id: string;
}
//Protect The Api From Unauthorised access
export const protect = asyncHandler(async (req: any, res: any, next: any) => {
  let token: any;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
