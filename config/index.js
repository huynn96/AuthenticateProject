module.exports = {
    mysqlDbConfig: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    port: process.env.PORT,
    facebookAuth: {
		'clientID': '1391089104277518',
		'clientSecret': '44935eca3a36aad9e0ba7fd8be4e146c',
		'callbackURL': 'http://localhost:8000/login/facebook/callback',
		'profileFields': ['id', 'displayName', 'photos', 'emails']
	},
    twitterAuth: {
        consumerKey: 'gLNCMVE2ngvnz3f2QpoF21vOF',
        consumerSecret: 'yjDeRXwed3zFAOBnFcgrgDRfbLOWMnLAYgmIFOM6HTgmjEgJra',
        callbackURL: "http://localhost:8000/login/twitter/callback"
    },
    googleAuth: {
        clientID: '95589102743-a2innufcl907aepg27n0sf7h5lr60uc9.apps.googleusercontent.com',
        clientSecret: 'tjIkJ7RV8L3cutlhUnRA4WCG',
        callbackURL: "http://localhost:8000/login/google/callback"
    }
}
