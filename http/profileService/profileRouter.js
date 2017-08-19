const express 						= require('express');
const ProfileController				= require('./ProfileController');
const ensureAuthenticatedMiddleware	= require('../middleware/ensure-authenticate-middleware');

let router = express.Router();

router.get('/', ensureAuthenticatedMiddleware, ProfileController.getProfile);

router.get('/edit', ensureAuthenticatedMiddleware, ProfileController.getEditProfile);

module.exports = router;
