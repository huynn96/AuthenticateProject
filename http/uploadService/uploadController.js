const multer 	= require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
})

let upload = multer({ storage: storage }).single('avatar');

function postImage(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
        	next(err);
        }

        res.json({message: "upload success"});
    });
}

exports.postImage = postImage;