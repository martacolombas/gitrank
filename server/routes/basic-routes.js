var express = require('express');
var router = express.Router();
const queries = require('../queries');

router.use(express.json());

router.get('/users', queries.getUsers);
router.get('/users/:id', queries.getUserById);
router.post('/users', queries.createUser);
router.put('/users/token/:id', queries.updateUserToken);
router.put('/users/password/:id', queries.updateUserPassword);
router.delete('/users/:id', queries.deleteUser);

module.exports = router;
