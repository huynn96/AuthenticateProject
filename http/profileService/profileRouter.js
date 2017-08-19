const express 						= require('express');
const ProfileController				= require('./ProfileController');
const ensureAuthenticatedMiddleware	= require('../middleware/ensure-authenticate-middleware');

let router = express.Router();

router.get('/', ensureAuthenticatedMiddleware, ProfileController.getProfile);

module.exports = router;
