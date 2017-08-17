class Credential {

	constructor (provider, providerId, username, password) {
		this.provider = provider;
		this.providerId = providerId;
		this.username = username;
		this.password = password;
	}

	setId (id) {
		this.id = id;
		return this;
	}

}

module.exports = Credential;
