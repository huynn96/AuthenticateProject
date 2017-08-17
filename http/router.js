const express 						= require('express');
const AuthController 				= require('./controller/AuthController');
const registerValidatorMiddlewre 	= require('./middleware/register-validator-middleware');
const userExistedMiddleware			= require('./middleware/user-existed-middleware');

let router = express.Router();

router.get('/register', AuthController.getRegister);

router.post('/register', userExistedMiddleware, registerValidatorMiddlewre, AuthController.postRegister)

router.get('/login', AuthController.getLogin);

module.exports = router;