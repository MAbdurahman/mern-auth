import User from '../models/userModel.js';






export const test = (req, res) => {
   res.json({
      message: 'API for mern-auth user/test is working.'
   })
}