const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  githubId: String,
  avatarUrl: String,
  token: String,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
