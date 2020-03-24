var express = require('express');
var router = express.Router();
const queries = require('../queries/basic-queries');

router.use(express.json());

router.get('/users', queries.getUsers);
router.get('/users/:id', queries.getUserById);
router.put('/users/token/:id', queries.updateUserToken);
router.delete('/users/:id', queries.deleteUser);

module.exports = router;
