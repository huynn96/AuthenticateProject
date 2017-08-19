const DBConnection 		= require('../../database/DBConnection');

module.exports = function (req, res, next) {
	let username = req.body.username;

	let query = "select * from credential where username=?";

	DBConnection.query(query, [username], (err, result) => {
		if (err) {
			reject(err);
		} else {
			if (result.length){
				res.render('register.html',{
					errors: [{msg: 'username is existed'}]
				});
			}else{
				next();
			}
		}
	});
	
}
