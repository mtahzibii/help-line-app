const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
 let token;

 if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  try {
   // Get token frpm header
   token = req.headers.authorization.split(' ')[1];

   //  Verify token
   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

   //  Get user from token
   req.user = await User.findById(decodedToken.id).select('-password');

   next();
  } catch (error) {
   console.log(error);
   res.status(401);
   throw new Error('Not authorized');
  }
 }

 if (!token) {
  res.status(401);
  throw new Error('Not authorized');
 }
});

module.exports = { protect };
