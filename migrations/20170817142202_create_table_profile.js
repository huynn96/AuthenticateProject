exports.up = function(knex, Promise) {
	return knex.schema.createTable('profile', (table) => {
		table.increments('id');
		table.integer('credentialId').notNullable();
		table.string('avatar').nullable();
		table.string('username');
		table.string('email');
		table.string('address');
		table.string('fullname');
	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('profile');
};
