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
            pais_nacimiento: req.body.paisNacimiento,
            ciudad_nacimiento: req.body.ciudadNacimiento,
            lugar_residencia: req.body.lugarResidencia,
            fecha_nacimiento: req.body.fechaNacimiento,
            ocupacion_principal: req.body.ocupacionPrincipal,
            escolaridad: req.body.escolaridad,
            colegio: req.body.colegio,
            estado_civil: req.body.estadoCivil,
            fecha_matrimonio: req.body.fechaMatrimonio,
            pasatiempo: req.body.pasaTiempo,
            genero_musical: req.body.generoMusical,
            capacidad_fisica: req.body.capacidadFisica,
            capacidad_caminar: req.body.capacidadCaminar

        });

        user.save(function (err) {
            if(err)
                console.log(err)
            else
            res.send(user)
        })

    }
}
