const express = require('express');

const router = express.Router();

// Middlewares

const tokenAuth = require('../../middlewares/tokenAuth');
const { validateUserRegisteration } = require('../../validations/userValidations');

// Controllers

const { getUserInfoController, registerUserController, loginUserController, logoutUserController } = require('../../controllers/userControllers');

// Declaring routes

router
   .get('/', tokenAuth, getUserInfoController)
   .post('/register', validateUserRegisteration, registerUserController)
   .post('/login', loginUserController)
   .get('/logout', tokenAuth,logoutUserController);

module.exports = router;
