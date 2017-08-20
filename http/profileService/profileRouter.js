const express 							= require('express');
const ProfileController					= require('./ProfileController');
const ensureAuthenticatedMiddleware		= require('../middleware/ensure-authenticate-middleware');
const updateProfileValidatorMiddleware 	= require('../middleware/update-profile-validator-middleware');

let router = express.Router();

router.get('/', ensureAuthenticatedMiddleware, ProfileController.getProfile);

router.get('/edit', ensureAuthenticatedMiddleware, ProfileController.getEditProfile);

router.post('/', ensureAuthenticatedMiddleware, updateProfileValidatorMiddleware, ProfileController.putProfile);

module.exports = router;
