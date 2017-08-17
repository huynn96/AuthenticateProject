var express = require('express');

let router = express.Router();

router.get('/register', (req, res, next) => {
	res.render('register.html');
});

router.get('/login', (req, res, next) => {
	res.render('login.html');
});

module.exports = router;