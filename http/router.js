const express 		= require('express');
const authRouter	= require('./authService/authRouter');
const profileRouter	= require('./profileService/profileRouter');
const uploadRouter	= require('./uploadService/uploadRouter');

let router = express.Router();

router.use('/profile', profileRouter);

router.use('/upload', uploadRouter);

router.use('/', authRouter);

module.exports = router;
