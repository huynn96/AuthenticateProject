const express 		= require('express');
const authRouter	= require('./authService/authRouter');
const profileRouter	= require('./profileService/profileRouter');

let router = express.Router();

router.use('/profile', profileRouter);

router.use('/', authRouter);

module.exports = router;
