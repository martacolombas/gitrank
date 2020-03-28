require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const basicRouter = require('./routes/basic-routes');
const oauthRouter = require('./routes/oauth-routes');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const db = mongoose.connection;
const passportSetUp = require('./config/passport-config');
const cors = require('cors');

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up session cookies
app.use(
  cookieSession({
    maxAge: 2592000,
    keys: [process.env.COOKIEKEY],
  })
);

// connect to db
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection to db successful!');
});

mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.ENC_PWD}@cluster0-mv9jj.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

// use middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// access authentication routes middlewares
app.use('/oauth', oauthRouter);
app.use('/', basicRouter);

app.listen(port, () => console.log(`🚀gitRank listening on port ${port}!`));
