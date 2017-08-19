const DBConnection      = require('../../../../database/DBConnection');
const ProfileStore      = require('../../../../profile/ProfileStore');
const FacebookStrategy  = require('passport-facebook').Strategy;
const config            = require('../../../../config');
const Credential        = require('../../../../credential/Credential');
const Profile           = require('../../../../profile/Profile');

let profileStore = new ProfileStore(DBConnection);

module.exports = new FacebookStrategy(config.facebookAuth, (accessToken, refreshToken, profile, done) => {
    let query = "select * from credential where provider=? and providerId=?";
    DBConnection.query(query, [profile.provider, profile.id], (err, result) => {
        if (err) {
            done(err);
        } else {
            if (result.length) {
                done(null, result[0]);
            } else {
                let credential = new Credential(profile.provider, profile.id);
                let profileUser = new Profile(profile.displayName, profile.displayName, profile.emails[0].value, null, profile.photos[0].value);
                DBConnection.query("insert into credential set ?", [credential], (err, result) => {
                    if (err) {
                        done(err);
                    } else {
                        credential.setId(result.insertId);
                        profileUser.setCredentialId(result.insertId);
                        profileStore.createProfile(profileUser)
                            .then((profile) => {
                                done(null, credential);
                            })
                            .catch(done);
                    }
                });
            }
        }
    });
});