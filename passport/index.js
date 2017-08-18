const DBConnection 	= require('../DBConnection');
const local  		= require('./provider/local');
const facebook 		= require('./provider/facebook');

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
}