import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {errorHandler} from '../utils/errorHandler.js';
import User from '../models/userModel.js';

export const signUp = async (req, res, next) => {
   const {username, email, password} = req.body;
   if (!username) {
      return next(errorHandler(400, 'Please enter a username!'));
   }
   if (!email) {
      return next(errorHandler(400, 'Please enter an email!'));
   }
   if (!password) {
      return next(errorHandler(400, 'Please enter a password!'));
   }

   const existingEmail = await User.findOne({email});
   if (existingEmail) {
      return next(errorHandler(400, 'Email already exists!'));
   }

   const existingUserName = await User.findOne({username});
   if (existingUserName) {
      return next(errorHandler(400, 'Username already exists!'));
   }

   const hashedPassword = bcryptjs.hashSync(password, 10);
   const newUser = new User({username, email, password: hashedPassword});

   try {
      await newUser.save();
      res.status(201).json({message: 'User created successfully'});
   }
   catch (err) {
      next(err);
   }
};

export const signIn = async (req, res, next) => {
   const {email, password} = req.body;

   try {
      if (!email) {
         return next(errorHandler(400, 'Please enter email!'));
      }
      if (!password) {
         return next(errorHandler(400, 'Please enter password!'))
      }

      const validUser = await User.findOne({email});
      if (!validUser) {
         return next(errorHandler(404, 'User not found!'));
      }

      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
         return next(errorHandler(401, 'Invalid Email or Password!'));
      }

      const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET_KEY);
      const {password: hashedPassword, ...rest} = validUser._doc;

      const milliseconds_minute = 60000;
      const milliseconds_hour = milliseconds_minute * 60;
      const milliseconds_day = milliseconds_hour * 24;
      const milliseconds_week = milliseconds_day * 7;
      const expiryDate = new Date(Date.now() + milliseconds_week)

      res
         .cookie('access_token', token, {httpOnly: true, expires: expiryDate})
         .status(200)
         .json(rest);

   }
   catch (err) {
      next(err);
   }
}
export const signOut = async (req, res, next) => {
   try {
      res.clearCookie('access_token');
      res.status(200).json('User signed out successfully!');
   }
   catch (err) {
      next(err);
   }
};
export const signInWithGoogle = async (req, res, next) => {
   try {
      const user = await User.findOne({email: req.body.email});

      const milliseconds_minute = 60000;
      const milliseconds_hour = milliseconds_minute * 60;
      const milliseconds_day = milliseconds_hour * 24;
      const milliseconds_week = milliseconds_day * 7;
      const expiryDate = new Date(Date.now() + milliseconds_week);

      if (user) {
         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
         const {password: pass, ...rest} = user._doc;

         res
            .cookie('access_token', token, {
               httpOnly: true, expires: expiryDate
            })
            .status(200)
            .json(rest);

      } else {
         const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
         const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
         const newUser = new User({
            username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8),
            email: req.body.email,
            password: hashedPassword,
            avatar: req.body.photo,
         });
         await newUser.save();
         const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY);
         const {password: pass, ...rest} = newUser._doc;
         res
            .cookie('access_token', token, {
               httpOnly: true, expires: expiryDate
            })
            .status(200)
            .json(rest);
      }
   }
   catch (err) {
      next(err);
   }
}