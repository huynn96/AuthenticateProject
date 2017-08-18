const express 						  = require('express');
const passport 						  = require('passport');
const AuthController 				  = require('./controller/AuthController');
const ProfileController				  = require('./controller/ProfileController');
const registerValidatorMiddlewre 	  = require('./middleware/register-validator-middleware');
const userExistedMiddleware			  = require('./middleware/user-existed-middleware');
const ensureAuthenticatedMiddleware   = require('./middleware/ensure-authenticate-middleware');
const ensureUnauthenticatedMiddleware = require('./middleware/ensure-unauthenticate-middleware');

let router = express.Router();

router.get('/register', ensureUnauthenticatedMiddleware, AuthController.getRegister);

router.post('/register', userExistedMiddleware, registerValidatorMiddlewre, AuthController.postRegister)

router.get('/login', ensureUnauthenticatedMiddleware, AuthController.getLogin);

router.post('/login',
	passport.authenticate('local', { 
		successRedirect: '/profile', 
		failureRedirect: '/login', 
		failureFlash: true
	})
);

router.get('/logout', AuthController.logout);

router.get('/profile', ensureAuthenticatedMiddleware, ProfileController.getProfile);

module.exports = router;
