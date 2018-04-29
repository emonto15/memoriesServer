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
    },

    createUser: function f(req,res) {
        var user = new User({
            nombre: req.body.nombre,
            edad: req.body.edad,
            genero: req.body.genero,
            google_id: req.body.google_id,
            registrado: req.body.registrado,
            direccion: req.body.direccion,
            pais_nacimiento: req.body.pais_nacimiento,
            ciudad_nacimiento: req.body.ciudad_nacimiento,
            lugar_residencia: req.body.lugar_residencia,
            fecha_nacimiento: req.body.fecha_nacimiento,
            ocupacion_principal: req.body.ocupacion_principal,
            escolaridad: req.body.escolaridad,
            colegio: req.body.colegio,
            estado_civil: req.body.estado_civil,
            fecha_matrimonio: req.body.fecha_matrimonio,
            pasatiempo: req.body.pasatiempo,
            genero_musical: req.body.genero_musical,
            capacidad_fisica: req.body.capacidad_fisica,
            capacidad_caminar: req.body.capacidad_caminar,
            familiares:req.body.familiares

        });

        user.save(function (err) {
            if(err)
                console.log(err)
            else
            res.send(user)
        })

    },

    getUserInfo: function f(req, res) {
        console.log(req.toString())
        User.findOne({google_id: req.body.google_id}, function (err, user) {
            if (user)
                res.send(user)

        })
    }
}
