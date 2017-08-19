const express 		= require('express');
const path			= require('path');
const authRouter	= require('./authService/authRouter');
const profileRouter	= require('./profileService/profileRouter');
const uploadRouter	= require('./uploadService/uploadRouter');

let router = express.Router();

router.use('/profile', profileRouter);

router.use('/upload', uploadRouter);

router.use('/', authRouter);

router.get('/image/:filename', (req, res, next) => {
	res.setHeader('Content-Type', 'image/jpg');
	res.status(200).sendFile(path.resolve(`./uploads/${req.params.filename}`));
});

module.exports = router;
