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

    getProfiles () {
        let query = "select * from profile";

        return new Promise((resolve, reject) => {
            this.mysqlConnection.query(query, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    if(result.length) {
                        resolve(result);
                    } else {
                        resolve(null);
                    }
                }
            })
        })
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

	updateProfile (profile) {
		let query = "update profile set fullname=?, email=?, address=?, avatar=? where credentialId=?";

		return new Promise((resolve, reject) => {
			this.mysqlConnection.query(query, [profile.fullname, profile.email, profile.address, profile.avatar, profile.credentialId], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(profile);
				}
			});
		});
	}

}

module.exports = ProfileStore;