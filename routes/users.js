var express = require('express'),
    router = express.Router(),
    users = require('../controllers/Users')

/* GET users listing. */
router.post('/login', users.login);
router.post('/createUser',users.createUser)

module.exports = router;
