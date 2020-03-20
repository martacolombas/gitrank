const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: String,
  githubId: String,
  avatarUrl: String,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
