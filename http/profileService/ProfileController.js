const DBConnection 		= require('../../database/DBConnection');
const ProfileStore 		= require('../../profile/ProfileStore');

let profileStore = new ProfileStore(DBConnection);

function getProfile (req, res, next) {
	profileStore.getProfileByCredentialId(req.user.id)
		.then((profile) => {
			res.render('profile.html', {profile: profile});
		})
		.catch(next);
}

function getEditProfile (req, res, next) {
	profileStore.getProfileByCredentialId(req.user.id)
		.then((profile) => {
			res.render('changeProfile.html', {profile: profile});
		})
		.catch(next);
}

function putProfile (req, res, next) {
	profileStore.updateProfile(req.profile)
		.then((profile) => {
			req.flash('success_msg', 'update profile successfully');
			res.redirect('/profile');
		})
		.catch(next);
}

exports.getProfile = getProfile;
exports.getEditProfile = getEditProfile;
exports.putProfile = putProfile;