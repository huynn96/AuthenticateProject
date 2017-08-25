const DBConnection 	= require('../../../database/DBConnection');
const local  		= require('./provider/local');
const facebook 		= require('./provider/facebook');
const twitter		= require('./provider/twitter');
const google		= require('./provider/google');

module.exports = function (passport) {
	passport.serializeUser(function(user, done) {
	  	done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		DBConnection.query("select * from credential where id=?", [id], (err, result) => {
			done(err, result[0]);
		});
	});

	passport.use(local);
	passport.use(facebook);
	passport.use(twitter);
	passport.use(google);
}