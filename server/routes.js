const queries = require('./queries');

app.get('/users', queries.getUsers);
app.get('/users/:id', queries.getUserById);
app.post('/users', queries.createUser);
app.put('/users/token/:id', queries.updateUserToken);
app.put('/users/password/:id', queries.updateUserPassword);
app.delete('/users/:id', queries.deleteUser);
