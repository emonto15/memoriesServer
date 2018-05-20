var express = require('express'),
    router = express.Router(),
    users = require('../controllers/Users')

/* GET users listing. */
router.post('/login', users.login);
router.post('/createUser',users.createUser);
router.get('/getUserInfo', users.getUserInfo);
router.post('/updateUser', users.updateUserInfo);
router.post('/test', users.testUpload);
router.post('/nextQuiz',users.nextRound);
router.post('/quiz/emotion',users.quizEmotionsUpload);
router.post('/report',users.getEmotions);
router.post('/question',users.createQuestion);


module.exports = router;
