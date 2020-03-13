require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const addRoutes = require('./routes');

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.listen(port, () => console.log(`🚀gitRank listening on port ${port}!`));

addRoutes(app);