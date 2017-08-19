const express 						  = require('express');
const passport 						  = require('passport');
const AuthController 				  = require('./AuthController');
const registerValidatorMiddlewre 	  = require('../middleware/register-validator-middleware');
const userExistedMiddleware			  = require('../middleware/user-existed-middleware');
const ensureUnauthenticatedMiddleware = require('../middleware/ensure-unauthenticate-middleware');

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

router.get('/login/facebook', passport.authenticate('facebook', {scope: 'email'}));
router.get('/login/facebook/callback',passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/login' }));

router.get('/logout', AuthController.logout);

module.exports = router;