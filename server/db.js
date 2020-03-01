
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gitranker', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new Schema({
  username: String
  token: String,


})
