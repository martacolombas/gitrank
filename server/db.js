const Pool = require('pg').Pool;
const pool = new Pool({
	user: process.env.USER,
	host: process.env.HOST,
	database: process.env.DB,
	password: process.env.PWD,
	port: process.env.DBPORT,
});

module.exports = pool;
