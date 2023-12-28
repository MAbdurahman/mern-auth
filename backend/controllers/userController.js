import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import {errorHandler} from '../utils/errorHandler.js';

export const test = (req, res) => {
   res.json({
      message: 'API for mern-auth user/test is working.'
   })
}

export const updateUser = async (req, res, next) => {
   if (req.user.id !== req.params.id) {
      return next(errorHandler('401', 'User Authorization Denied!'));
   }

   try {
      if (req.body.password) {
         req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
         $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture
         },
      }, {new: true});

      const {password, ...rest} = updatedUser._doc;
      res.status(200).json(rest);

   }
   catch (err) {
      next(err);
   }
}

export const deleteUser = async (req, res, next) => {
   if (req.user.id !== req.params.id) {
      return next(errorHandler('401', 'User Authorization Denied!'));
   }
   try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User Successfully Deleted!');

   }
   catch (err) {
      next(err)
   }

}