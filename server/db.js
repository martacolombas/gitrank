const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection successful!');
});

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.ENC_PWD}@cluster0-mv9jj.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
