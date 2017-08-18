const passport 			= require('passport');
const DBConnection 		= require('../../DBConnection');
const ProfileStore		= require('../../profile/ProfileStore');
const Profile 			= require('../../profile/Profile');

let profileStore = new ProfileStore(DBConnection);

function getRegister (req, res, next) {
	res.render('register.html');
}

function getLogin (req, res, next) {
	res.render('login.html');
}

function postRegister (req, res, next) {
	DBConnection.query("insert into credential set ?", [req.credential], (err, result) => {
		if (err) {
			next(err);
		} else {
			req.credential.setId(result.insertId);
			req.profile.setCredentialId(result.insertId);
			profileStore.createProfile(req.profile)
				.then((profile) => {
					req.flash('success_msg', 'You are registered and can now login');
					res.redirect('/login');
				})
				.catch(next);
		}
	});
}

exports.getRegister = getRegister;
exports.postRegister = postRegister;
exports.getLogin = getLogin;
