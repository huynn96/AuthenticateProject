const express 						= require('express');
const uploadController				= require('./uploadController');
const ensureAuthenticatedMiddleware	= require('../middleware/ensure-authenticate-middleware');

let router = express.Router();

router.post('/', uploadController.postImage);

module.exports = router;
