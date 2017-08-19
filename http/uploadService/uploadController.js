const multer 	= require('multer');
const path      = require('path');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

let upload = multer({ storage: storage }).single('avatar');

function postImage(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
        	next(err);
        }
        console.log(req.file);

        res.json({
            status: 'success', 
            link: `/image/${req.file.filename}` 
        });
    });
}

exports.postImage = postImage;