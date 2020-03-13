const pool = require('./db');

const getUsers = (request, response) => {
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getUserById = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query('SELECT * FROM users WHERE id=$1', [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const createUser = (request, response) => {
	const { username, password, token } = request.body;
	pool.query(
		'INSERT INTO users (username, password, token) VALUES ($1, $2, $3)',
		[username, password, token],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(201).send(`User added with ID: ${result.insertId}`);
		}
	);
};

const updateUserToken = (request, response) => {
	const id = parseInt(request.params.id);
	const { token } = request.body;

	pool.query(
		'UPDATE users SET token=$1 WHERE id = $2',
		[token, id],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send(`User modified with ID: ${id}`);
		}
	);
};

const updateUserPassword = (request, response) => {
	const id = parseInt(request.params.id);
	const { password } = request.body;

	pool.query(
		'UPDATE users SET password=$1 WHERE id = $2',
		[password, id],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send(`User modified with ID: ${id}`);
		}
	);
};

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`User deleted with ID: ${id}`);
	});
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUserToken,
	updateUserPassword,
	deleteUser,
};
