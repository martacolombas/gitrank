const User = require('../models/user-models');

const getUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).send(users);
  } catch (error) {
    response.status(500);
    console.error(`Error ${error} occurred`);
  }
};

const getUserById = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if (id) {
      const user = await User.findOne({ githubId: id });
      response.status(200).send(user);
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
};
