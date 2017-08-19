const mysql 	= require('mysql');
const config 	= require('../config');

let mysqlDbConfig = config.mysqlDbConfig;
let mysqlConnection = mysql.createPool(mysqlDbConfig);

module.exports = mysqlConnection;
