const DBConnection = require('../../DBConnection');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../../config');

module.exports = new FacebookStrategy(config.facebookAuth, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
});