var express = require('express'),
    router = express.Router(),
    users = require('../controllers/Users')

/* GET users listing. */
router.post('/login', users.login);
router.post('/createUser',users.createUser);
router.get('/getUserInfo', users.getUserInfo);
router.post('/updateUser', users.updateUserInfo);
router.post('/test', users.testUpload);
router.post('/quiz/emotion',users.quizEmotionsUpload);
router.post('/report',users.getEmotions)

module.exports = router;
