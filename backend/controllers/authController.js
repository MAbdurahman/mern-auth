import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/userModel.js";

export const signUp = async (req, res, next) => {
   const { username, email, password } = req.body;
   /*if (username) {
      return next(errorHandler('409', 'Username already exists!'));
   }
   if (email) {
      return next(errorHandler('409', 'Email already exists!'));
   }*/
   const hashedPassword = bcryptjs.hashSync(password, 10);
   const newUser = new User({ username, email, password: hashedPassword });

   try {
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
   } catch (error) {
      next(error);
   }

};