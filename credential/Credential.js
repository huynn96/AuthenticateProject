const bcrypt = require('bcryptjs');

class Credential {

	constructor (provider, providerId, username) {
		this.provider = provider;
		this.providerId = providerId;
		this.username = username;
	}

	setId (id) {
		this.id = id;
		return this;
	}

	hashPassword (password) {
		let salt = bcrypt.genSaltSync(10);
		this.password = bcrypt.hashSync(password, salt);
		return this;
	}
}

module.exports = Credential;
