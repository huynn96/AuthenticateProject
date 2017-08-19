const DBConnection 		= require('../../database/DBConnection');
const ProfileStore 		= require('../../profile/ProfileStore');

let profileStore = new ProfileStore(DBConnection);

function getProfile(req, res, next) {
	profileStore.getProfileByCredentialId(req.user.id)
		.then((profile) => {
			res.render('profile.html', {profile: profile});
		})
		.catch(next);
}

function getEditProfile(req, res, next) {
	res.render('changeProfile.html', )
}

exports.getProfile = getProfile;
exports.getEditProfile = getEditProfile;