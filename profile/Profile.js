class Profile {

	constructor (username, fullname, email, address, avatar) {
		this.username = username;
		this.fullname = fullname;
		this.email 	  = email;
		this.address  = address;
		this.avatar   = avatar;
	}

	setId (id) {
		this.id = id;
		return this;
	}

	setCredentialId(id) {
		this.credentialId = id;
		return this;
	}

}

module.exports = Profile;
