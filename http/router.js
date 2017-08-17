let express = require('express');

let router = express.Router();

router.get('/register', (req, res, next) => {
	res.render('register.html');
});

router.get('/login', (req, res, next) => {
	res.render('login.html');
});
router.get('/edit', (request, response, next) => {
	response.render('edit.html');
});
router.get('/detail', (request, response, next) => {
	response.render('detail.html');
});
module.exports = router;
