const getUsers = async (request, response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC');
    response.status(200).send(rows);
  } catch (error) {
    response.status(500);
    console.error(`Error ${error} occurred`);
  }
};

const getUserById = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (id) {
      const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [
        id,
      ]);
      response.status(200).send(rows[0]);
    } else {
      response.status(204);
      console.log(`Couldn't find ${id}`);
    }
  } catch (error) {
    response.status(500);
    console.error(`Error ${error} occurred`);
  }
};

const createUser = async (request, response) => {
  try {
    const { username, password, token } = request.body;
    const {
      rows,
    } = await pool.query(
      'INSERT INTO users (username, password, token) VALUES ($1, $2, $3) RETURNING *',
      [username, password, token]
    );
    response.status(201).send(rows[0]);
  } catch (error) {
    response.status(500);
    console.error(`Error ${error} occurred`);
  }
};

const updateUserToken = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (id) {
      const { token } = request.body;
      const {
        rows,
      } = await pool.query(
        'UPDATE users SET token=$1 WHERE id = $2 RETURNING *',
        [token, id]
      );
      response.status(201).send(rows);
    } else {
      response.status(204);
      console.log(`Couldn't find ${id}`);
    }
  } catch (error) {
    response.status(500);
    console.error(`Error ${error} occurred`);
  }
};

const updateUserPassword = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (id) {
      const { password } = request.body;
      const {
        rows,
      } = await pool.query(
        'UPDATE users SET password=$1 WHERE id = $2 RETURNING *',
        [password, id]
      );
      response.status(201).send(rows);
    } else {
      response.status(204);
      console.log(`Couldn't find ${id}`);
    }
  } catch (error) {
    response.status(500);
    console.error(`Error ${error} occurred`);
  }
};

const deleteUser = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (id) {
      const { rows } = await pool.query('DELETE FROM users WHERE id = $1', [
        id,
      ]);
      response.status(201).send(rows);
    } else {
      response.status(204);
      console.log(`Couldn't find ${id}`);
    }
  } catch (error) {
    response.status(500);
    console.error(`Error ${error} occurred`);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserToken,
  updateUserPassword,
  deleteUser,
};
