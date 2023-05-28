const Users = require('../models/Users');
const Sessions = require('../models/Sessions');

const { hashPassword, verifyPassword } = require('../utils/hashPassword');
const { createJWT } = require('../services/jwtAuth');

// USER CONTROLLERS

// @route   /users
// @desc    Get User Info By Token
// @body    none
// @access  Private (should pass tokenAuth middleware)

const getUserInfoController = async (req, res) => {
   const { user_id } = req;

   const { user, err } = await Users.findUserById(user_id);

   if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
   }

   if (!user) {
      return res.status(404).json({ message: 'User not found' });
   }

   return res.status(200).json({ message: 'User Found Successfully', user });
};

// @route   POST /users/register
// @desc    Register User By Email And Password
// @body    { email, password }
// @access  Public

const registerUserController = async (req, res) => {
   // check if the email and password are there

   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      return res.status(400).json({
         message: 'Please provide an email and password',
      });
   }

   // check if the user already exists

   const { user, err } = await Users.findUserByEmail(email);

   if (err) {
      return res.status(500).json({
         message: 'Internal Server Error',
         error: err.message,
      });
   }

   if (user) {
      return res.status(409).json({ message: 'User already exists' });
   }

   // hash the password

   let hashedPassword = hashPassword(password);

   if (!hashedPassword) {
      return res.status(500).json({
         message: 'Internal Server Error',
         error: 'Something went wrong!',
      });
   }

   // create the user using the email and hashed password

   const { user: createdUser, err: createErr } = await Users.createUser(name, email, hashedPassword);

   if (createErr) {
      return res.status(500).json({
         message: 'Internal Server Error',
         error: createErr.message,
      });
   }

   if (!createdUser) {
      return res.status(500).json({ message: 'Something went wrong!' });
   }

   // create jwt token using email

   const token = createJWT(email);

   if (!token) {
      return res.status(500).json({
         message: 'Internal Server Error',
         error: 'Something went wrong!',
      });
   }

   // create a session for the user

   const { session, err: sessionErr } = await Sessions.createSession(token, createdUser.id);

   if (sessionErr) {
      return res.status(500).json({
         message: 'Internal Server Error',
         error: sessionErr.message,
      });
   }

   if (!session) {
      return res.status(500).json({
         message: 'Something went wrong!',
      });
   }

   // send the token to the user

   return res.status(201).json({
      message: 'User Registered Successfully',
      token: session.token,
   });
};

// @route  POST /users/login
// @desc   Login User By Email And Password
// @body   { email, password }
// @access Public

const loginUserController = async (req, res) => {
   // check if the email and password are there

   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json({
         message: 'Please provide an email and password',
      });
   }

   // check if the user exists

   const { user, err } = await Users.findUserByEmail(email);

   if (err) {
      return res.status(500).json({
         message: 'Internal Server Error',
         error: err.message,
      });
   }

   if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
   }

   // check if the password is correct

   const isPasswordCorrect = verifyPassword(password, user.password);

   if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Credentials' });
   }

   // create jwt token using email

   const token = createJWT(email);

   if (!token) {
      return res.status(500).json({
         message: 'Internal Server Error',
         error: 'Something went wrong!',
      });
   }

   // create a session for the user

   const { session, err: sessionErr } = await Sessions.createSession(token, user.id);

   if (sessionErr) {
      return res.status(500).json({
         message: 'Internal Server Error',
         error: sessionErr.message,
      });
   }

   if (!session) {
      return res.status(500).json({
         message: 'Something went wrong!',
      });
   }

   // send the token to the user

   return res.status(200).json({
      message: 'User Logged In Successfully',
      token: session.token,
   });
};

// @route GET /users/logout
// @desc   Logout user
// @body   none
// @access  Private (should pass tokenAuth middleware)

const logoutUserController = async (req, res) => {
   const { token } = req;

   let err = await Sessions.removeSession(token);

   if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
   }

   return res.status(200).json({ message: 'Logout Successful' });
};

// EXPORTS

module.exports = {
   getUserInfoController,
   registerUserController,
   loginUserController,
   logoutUserController,
};
