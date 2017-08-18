class ProfileStore { 

	constructor (mysqlConnection) {
		this.mysqlConnection = mysqlConnection;
	}

	getProfileByCredentialId (id) {
		let query = "select * from profile where credentialId=?";

		return new Promise((resolve, reject) => {
			this.mysqlConnection.query(query, [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					if (result.length){
						resolve(result[0]);
					} else {
						resolve(null);
					}
				}
			});
		});
	}

	createProfile (profile) {
		let query = "insert into profile set ?";

		return new Promise((resolve, reject) => {
			this.mysqlConnection.query(query, [profile], (err, result) => {
				if (err) {
					reject(err);
				} else {
					profile.setId(result.insertId);
					resolve(profile);
				}
			});
		});
	}

}

module.exports = ProfileStore;