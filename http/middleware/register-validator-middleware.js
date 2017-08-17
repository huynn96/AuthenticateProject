const Credential = require('../../credential/Credential');
const Profile = require('../../profile/Profile');

module.exports = function (req, res, next) {
	let fullname = req.body.fullname;
	let username = req.body.username;
	let password = req.body.password;
	let password2 = req.body.password2;
	let email = req.body.email;
	let address = req.body.address;
	let avatar = req.body.avatar;

	req.checkBody('fullname', 'FullName is required').notEmpty();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Password is not match').equals(req.body.password);

	req.getValidationResult().then((result) => {
		let errors = result.array();
		if (!result.isEmpty()){
			res.render('register.html',{
				errors: errors
			});
		}else{
			req.credential = new Credential(null, null, username).hashPassword(password);
			req.profile = new Profile(username, fullname, email, address, avatar);
			next();
		}
	});
	
}
