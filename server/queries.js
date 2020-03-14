const pool = require('./db');
pool.connect();

const getUsers = async (request, response) => {
	const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC');
	response.status(200).send(rows);
};

const getUserById = async (request, response) => {
	const id = parseInt(request.params.id);
	const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
	response.status(200).send(rows[0]);
};

const createUser = async (request, response) => {
	const { username, password, token } = request.body;
	const {
		rows,
	} = await pool.query(
		'INSERT INTO users (username, password, token) VALUES ($1, $2, $3) RETURNING *',
		[username, password, token]
	);
	response.status(201).send(rows[0]);
};

const updateUserToken = async (request, response) => {
	const id = parseInt(request.params.id);
	const { token } = request.body;
	const {
		rows,
	} = await pool.query('UPDATE users SET token=$1 WHERE id = $2 RETURNING *', [
		token,
		id,
	]);
	response.status(201).send(rows);
};

const updateUserPassword = async (request, response) => {
	const id = parseInt(request.params.id);
	const { password } = request.body;
	const {
		rows,
	} = await pool.query(
		'UPDATE users SET password=$1 WHERE id = $2 RETURNING *',
		[password, id]
	);
	response.status(201).send(rows);
};

const deleteUser = async (request, response) => {
	const id = parseInt(request.params.id);
	const { rows } = await pool.query('DELETE FROM users WHERE id = $1', [id]);
	response.status(201).send(rows);
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUserToken,
	updateUserPassword,
	deleteUser,
};
