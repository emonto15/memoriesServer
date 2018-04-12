var mongoose = require('mongoose'),
    User = mongoose.model('Users');
module.exports = {
    login: function f(req, res) {
        console.log(req.toString())
        User.findOne({google_id: req.body.google_id}, function (err, user) {
            if (user)
                res.send(user)
            else {
                var newUser = new User()
                newUser.google_id = req.body.google_id
                newUser.registrado = false
                newUser.save(function (err) {
                    if (err)
                        console.log(err)
                    res.send(newUser)
                })
            }

        })
    }
}
