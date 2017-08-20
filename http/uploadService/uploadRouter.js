const express 						= require('express');
const uploadController				= require('./uploadController');

let router = express.Router();

router.post('/', uploadController.postImage);

module.exports = router;
