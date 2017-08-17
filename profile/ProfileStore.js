class ProfileStore { 

	constructor (mysqlConnection) {
		this.mysqlConnection = mysqlConnection;
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