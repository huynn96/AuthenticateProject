const passport 			= require('passport');
const DBConnection 		= require('../../DBConnection');
const ProfileStore		= require('../../profile/ProfileStore');
const Profile 			= require('../../profile/Profile');
const bcrypt 			= require('bcryptjs');
const LocalStrategy 	= require('passport-local').Strategy;

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
					res.redirect('/login');
				})
				.catch(next);
		}
	});
}

passport.use(new LocalStrategy(
    function(username, password, done) {
        DBConnection.query("select * from credential where username=?", [username], (err, result) => {
            if (err) {
                return done(err);
            }
            if (!result.length) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            bcrypt.compare(password, result[0].password).then((isMatch) => {
            	if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, result[0]);
			});
        });
    }
));

passport.serializeUser(function(user, done) {
  	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	DBConnection.query("select * from credential where id=?", [id], (err, result) => {
		done(err, result[0]);
	});
});

exports.getRegister = getRegister;
exports.postRegister = postRegister;
exports.getLogin = getLogin;
