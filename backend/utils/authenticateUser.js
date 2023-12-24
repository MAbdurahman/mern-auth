
import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';

/**
 * @description - authenticates the user base on json web token
 * @param req - the request
 * @param res - the response
 * @param next - callback function, the next middleware
 * @returns {*}
 */
export const authenticateToken = (req, res, next) => {
   const token = req.cookies.access_token;

   if (!token) {
      return next(errorHandler(401, 'User cannot be authenticated!'));
   }

   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
         return next(errorHandler(403, 'Token cannot be authenticated!'));
      }

      req.user = user;
      next();
   });

}