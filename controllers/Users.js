const mongoose = require('mongoose'),
    User = mongoose.model('Users');
module.exports = {
    login: function f(req, res) {
        console.log(req.toString());
        User.findOne({google_id: req.body.google_id}, function (err, user) {
            if (user)
                res.send(user);
            else {
                res.send({"registrado": false})
            }

        })
    },

    createUser: function f(req, res) {
        let user = new User({
            nombre: req.body.nombre,
            edad: req.body.edad,
            genero: req.body.genero,
            google_id: req.body.google_id,
            registrado: req.body.registrado,
            direccion: req.body.direccion,
            departamento_nacimiento: req.body.departamento_nacimiento,
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
            familiares: req.body.familiares

        });

        user.save(function (err) {
            if (err)
                console.log(err);
            else
                res.send(user)
        })

    },

    getUserInfo: function f(req, res) {
        console.log(req.toString());
        User.findOne({google_id: req.body.google_id}, function (err, user) {
            if (user)
                res.send(user);
            else
                console.log(err)

        })
    },

    updateUserInfo: function f(req, res) {
        User.updateOne({google_id: req.body.google_id}, {
            $set: {
                nombre: req.body.nombre,
                edad: req.body.edad,
                genero: req.body.genero,
                google_id: req.body.google_id,
                registrado: req.body.registrado,
                direccion: req.body.direccion,
                departamento_nacimiento: req.body.departamento_nacimiento,
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
                familiares: req.body.familiares
            }
        }, function (err) {

            if (err) {
                res.send(err).status(500)
            } else {
                res.send("actualizado exitosamente").status(200)
            }
        })

    },

    testUpload: function f(req, res) {
        User.findOne({google_id: req.body.google_id}, function (err, user) {
            let test = {
                fecha: req.body.fecha,
                puntaje_global: req.body.global,
                paciente: {
                    memoria: req.body.paciente.memoria,
                    orientacion: req.body.paciente.orientacion,
                    juicio: req.body.paciente.juicio
                },
                informante: {
                    memoria: req.body.informante.memoria,
                    orientacion: req.body.informante.orientacion,
                    juicio: req.body.informante.juicio
                }
            };
            if (user) {
                user.test.push(test);
                user.save(function(err){
                    if(!err){
                        res.status(200).send(user.google_id);
                    }else{
                        res.status(500).send({err: "Poblems saving: "+ req.body.google_id});
                    }

                })
            }else{
                res.status(404).send({err: "User with google id: "+ req.body.google_id + " was not found"});
            }

        })
    }

};
