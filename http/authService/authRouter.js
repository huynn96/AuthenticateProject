const express 						  = require('express');
const passport 						  = require('passport');
const AuthController 				  = require('./AuthController');
const registerValidatorMiddlewre 	  = require('../middleware/register-validator-middleware');
const userExistedMiddleware			  = require('../middleware/user-existed-middleware');
const ensureUnauthenticatedMiddleware = require('../middleware/ensure-unauthenticate-middleware');
const ensureAuthenticatedMiddleware = require('../middleware/ensure-authenticate-middleware');

let router = express.Router();

router.get('/', ensureAuthenticatedMiddleware, (req, res, next) => {
	res.redirect('/profile');
});

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
//facebook
router.get('/login/facebook', passport.authenticate('facebook', {scope: 'email'}));
router.get('/login/facebook/callback',passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/login' }));
//twitter
router.get('/login/twitter', passport.authenticate('twitter'));
router.get('/login/twitter/callback',passport.authenticate('twitter', { successRedirect: '/profile', failureRedirect: '/login' }));
//google
router.get('/login/google', passport.authenticate('google', { scope: [
	'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
] }));
router.get('/login/google/callback', passport.authenticate('google', { successRedirect: '/profile', failureRedirect: '/login' }));

router.get('/logout', AuthController.logout);

module.exports = router;
