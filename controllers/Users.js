const mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    Question = mongoose.model('Questions');
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

    createQuestion: function f(req, res) {
        let question = new Question({
            idArea: req.body.idArea,
            subAreas: req.body.subAreas
        });

        question.save(function (err) {
            if (err)
                console.log(err);
            else
                res.send(question)
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
                memoria: req.body.memoria,
                orientacion: req.body.orientacion,
                juicio: req.body.juicio
            };
            if (user) {
                user.test.push(test);
                user.save(function (err) {
                    if (!err) {
                        res.status(200).send(user.google_id);
                    } else {
                        res.status(500).send({err: "Poblems saving: " + req.body.google_id});
                    }

                })
            } else {
                res.status(404).send({err: "User with google id: " + req.body.google_id + " was not found"});
            }

        })
    },

    nextRound: function f(req, res) {
        User.findOne({google_id: req.body.google_id}, function (err, user) {
            if(user) {
                var peorTest = -1
                var peorQuiz = -1
                var ultimo = user.test[user.test.length - 1]
                var memoria = 100 - (ultimo.memoria * 33.333333333333333333)
                var orientacion = 100 - (ultimo.orientacion * 33.333333333333333333)
                var juicio = 100 - (ultimo.juicio * 33.333333333333333333)
                if (memoria < orientacion) {
                    if (memoria < juicio) {
                        peorTest = 1
                    } else {
                        peorTest = 3
                    }
                } else if (juicio < orientacion) {
                    peorTest = 3
                } else {
                    peorTest = 2
                }
                ultimo = user.resultados[user.resultados.length - 1]
                memoria = ultimo.memoria
                juicio = ultimo.juicio
                orientacion = ultimo.orientacion
                if (memoria < orientacion) {
                    if (memoria < juicio) {
                        peorQuiz = 1
                    } else {
                        peorQuiz = 3
                    }
                } else if (juicio < orientacion) {
                    peorQuiz = 3
                } else {
                    peorQuiz = 2
                }
                var options = [1, 2, 3]
                var p, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10
                var subArea11, subArea12, subArea13, subArea14, subArea21, subArea22
                var subareas, keys, val, max, randArea
                if (peorTest == peorQuiz) {
                    options.splice(options.indexOf(peorTest), 1)
                    subareas = user.gustos[peorTest.toString()]
                    keys = Object.keys(subareas)
                    val1 = Object.values(subareas)
                    max = Math.max(...val1)
                    Question.findOne({idArea: peorTest}, function (err, area) {
                        area.subAreas.forEach(function (val) {
                            if (val.id == keys[val1.indexOf(max)]) {

                                //3 primeras de la peorTest area y subarea con la mejor emocion
                                p1 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON()
                                p1.area = area.idArea
                                p1.subArea = val.id
                                p2 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON()
                                p2.area = area.idArea
                                p2.subArea = val.id
                                p3 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON()
                                p3.area = area.idArea
                                p3.subArea = val.id
                                //3 Aleatorias de las demas subareas
                                subArea12 = area.subAreas[Math.floor(Math.random() * area.subAreas.length)]
                                p4 = subArea12.preguntas[Math.floor(Math.random() * subArea12.preguntas.length)].toJSON()
                                p4.area = area.idArea
                                p4.subArea = subArea12.id
                                subArea13 = area.subAreas[Math.floor(Math.random() * area.subAreas.length)]
                                p5 = subArea13.preguntas[Math.floor(Math.random() * subArea13.preguntas.length)].toJSON()
                                p5.area = area.idArea
                                p5.subArea = subArea13.id
                                subArea14 = area.subAreas[Math.floor(Math.random() * area.subAreas.length)]
                                p6 = subArea14.preguntas[Math.floor(Math.random() * subArea14.preguntas.length)].toJSON()
                                p6.area = area.idArea
                                p6.subArea = subArea14.id

                                randInt = Math.floor(Math.random() * (options.length -1))
                                console.log(randInt)
                                randArea = options[randInt]
                                options.splice(options.indexOf(randArea), 1)
                                //Siguiente area aleatoria para seleccionar 2 pregs
                                Question.findOne({idArea: randArea}, function (err, area1) {
                                    subareas = user.gustos[randArea]
                                    keys = Object.keys(subareas.toJSON())
                                    val = Object.values(subareas.toJSON())
                                    max = Math.max(...val)
                                    console.log(subareas,keys,val,max)
                                    area1.subAreas.forEach(function (val1) {
                                        console.log(val1.id, 'o', keys[val.indexOf(max)])
                                        if (val1.id == keys[val.indexOf(max)]) {
                                            // 1 obtener la subarea con la mejor emocion
                                            p7 = val1.preguntas[Math.floor(Math.random() * val1.preguntas.length)].toJSON()
                                            p7.area = area1.idArea
                                            p7.subArea = val1.id
                                            //subarea aleatoria
                                            subArea21 = area1.subAreas[Math.floor(Math.random() * area1.subAreas.length)]
                                            p8 = subArea21.preguntas[Math.floor(Math.random() * subArea21.preguntas.length)].toJSON()
                                            p8.area = area1.idArea
                                            p8.subArea = subArea21.id
                                            //Area restante 2 pregs
                                            Question.findOne({idArea: options[0]}, function (err, area2) {
                                                subareas = user.gustos[options[0]]
                                                keys = Object.keys(subareas)
                                                val = Object.values(subareas)
                                                max = Math.max(...val)
                                                area2.subAreas.forEach(function (val2) {
                                                    if (val2.id == keys[val.indexOf(max)]) {
                                                        //1 obtener la subarea con la mejor emocion
                                                        p9 = val2.preguntas[Math.floor(Math.random() * val2.preguntas.length)].toJSON()
                                                        p9.area = area2.idArea
                                                        p9.subArea = val2.id
                                                        //1 subarea aleatoria
                                                        subArea22 = area2.subAreas[Math.floor(Math.random() * area2.subAreas.length)]
                                                        p10 = subArea22.preguntas[Math.floor(Math.random() * subArea22.preguntas.length)].toJSON()
                                                        p10.area = area2.idArea
                                                        p10.subArea = subArea22.id
                                                        console.log(p10)
                                                        p = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]
                                                        console.log(p.length)
                                                        res.status(200).send(p)
                                                    }
                                                })
                                            })
                                        }
                                    })
                                })
                            }
                        })
                    })
                } else {
                    options.splice(options.indexOf(peorTest), 1)
                    subareas = user.gustos[peorTest.toString()]
                    keys = Object.keys(subareas)
                    val = Object.values(subareas)
                    max = Math.max(...val)
                    Question.findOne({idArea: peorTest}, function (err, area) {
                        area.subAreas.forEach(function (val) {
                            if (val.id === keys[val.indexOf(max)]) {
                                //2 primeras de la peorTest area y subarea con la mejor emocion
                                p1 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON()
                                p1.area = area.id
                                p1.subArea = val.id
                                p2 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON()
                                p2.area = area.id
                                p2.subArea = val.id
                                subArea11 = area.subAreas[Math.floor(Math.random() * area.subAreas.length)]
                                p3 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON()
                                p3.area = area.id
                                p3.subArea = subArea11.id
                                //3 Aleatorias de las demas subareas
                                subArea12 = area.subAreas[Math.floor(Math.random() * area.subAreas.length)]
                                p4 = subArea12.preguntas[Math.floor(Math.random() * subArea12.preguntas.length)].toJSON()
                                p4.area = area.id
                                p4.subArea = subArea12.id
                                options.splice(options.indexOf(peorQuiz), 1)
                                //Siguiente area aleatoria para seleccionar 2 pregs
                                Question.findOne({idArea: peorQuiz}, function (err, area1) {
                                    subareas = user.gustos[randArea]
                                    keys = Object.keys(subareas)
                                    val = Object.values(subareas)
                                    max = Math.max(...val)
                                    area1.subAreas.forEach(function (val1) {
                                        if (val1.id === keys[val.indexOf(max)]) {
                                            // 1 obtener la subarea con la mejor emocion
                                            p5 = val1.preguntas[Math.floor(Math.random() * val1.preguntas.length)].toJSON()
                                            p5.area = area1.id
                                            p5.subArea = val1.id
                                            p6 = val1.preguntas[Math.floor(Math.random() * val1.preguntas.length)].toJSON()
                                            p6.area = area1.id
                                            p6.subArea = val1.id
                                            //subarea aleatoria
                                            subArea21 = area1.subAreas[Math.floor(Math.random() * area1.subAreas.length)]
                                            p7 = subArea21.preguntas[Math.floor(Math.random() * subArea21.preguntas.length)].toJSON()
                                            p7.area = area1.id
                                            p7.subArea = subArea21.id
                                            subArea22 = area1.subAreas[Math.floor(Math.random() * area1.subAreas.length)]
                                            p8 = subArea22.preguntas[Math.floor(Math.random() * subArea21.preguntas.length)].toJSON()
                                            p8.area = area1.id
                                            p8.subArea = subArea22.id
                                            //Area restante 2 pregs
                                            Question.findOne({idArea: options[0]}, function (err, area2) {
                                                subareas = user.gustos[options[0]]
                                                keys = Object.keys(subareas)
                                                val = Object.values(subareas)
                                                max = Math.max(...val)
                                                area2.subAreas.forEach(function (val2) {
                                                    if (val2.id === keys[val.indexOf(max)]) {
                                                        //1 obtener la subarea con la mejor emocion
                                                        p9 = val2.preguntas[Math.floor(Math.random() * val2.preguntas.length)].toJSON()
                                                        p9.area = area2.id
                                                        p9.subArea = val2.id
                                                        //1 subarea aleatoria
                                                        subArea22 = area2.subAreas[Math.floor(Math.random() * area2.subAreas.length)]
                                                        p10 = subArea22.preguntas[Math.floor(Math.random() * subArea22.preguntas.length)].toJSON()
                                                        p10.area = area2.id
                                                        p10.subArea = subArea22.id
                                                        p = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]
                                                        res.status(200).send(p)
                                                    }
                                                })
                                            })
                                        }
                                    })
                                })
                            }
                        })
                    })
                }
            }else {
                res.status(404).send("Daniel el pelele")
            }
        })
    },

    quizAnswersUpload: function f(req, res) {
        User.findOne({google_id: req.body.google_id}, function (err, user) {
            var resultado = {
                fecha: req.body.fecha,
                memoria: req.body.memoria,
                orientacion: req.body.orientacion,
                juicio: req.body.juicio
            }
            user.resultados.push(resultado)
        })
    },

    quizEmotionsUpload: function f(req, res) {
        if (req.body.sumar === "1.1") {
            User.findOneAndUpdate({google_id: req.body.google_id}, {$inc: {'gustos.1.1': 1}}, function (err, user) {
                user.save()
                res.status(200).send()
            })

        } else if (req.body.sumar === "1.2") {
            User.findOneAndUpdate({google_id: req.body.google_id}, {$inc: {'gustos.1.2': 1}}, function (err, user) {
                user.save()
                res.status(200).send()
            })
        } else if (req.body.sumar === "1.3") {
            User.findOneAndUpdate({google_id: req.body.google_id}, {$inc: {'gustos.1.3': 1}}, function (err, user) {
                user.save()
                res.status(200).send()
            })

        } else if (req.body.sumar === "2.1") {
            User.findOneAndUpdate({google_id: req.body.google_id}, {$inc: {'gustos.2.1': 1}}, function (err, user) {
                user.save()
                res.status(200).send()
            })

        } else if (req.body.sumar === "2.2") {
            User.findOneAndUpdate({google_id: req.body.google_id}, {$inc: {'gustos.2.2': 1}}, function (err, user) {
                user.save()
                res.status(200).send()
            })

        } else if (req.body.sumar === "3.1") {
            User.findOneAndUpdate({google_id: req.body.google_id}, {$inc: {'gustos.3.1': 1}}, function (err, user) {
                user.save()
                res.status(200).send()
            })

        } else if (req.body.sumar === "3.2") {
            User.findOneAndUpdate({google_id: req.body.google_id}, {$inc: {'gustos.3.2': 1}}, function (err, user) {
                user.save()
                res.status(200).send()
            })

        } else if (req.body.sumar === "3.3") {
            User.findOneAndUpdate({google_id: req.body.google_id}, {$inc: {'gustos.3.3': 1}}, function (err, user) {
                user.save()
                res.status(200).send()
            })

        } else if (req.body.sumar === "3.4") {
            User.findOneAndUpdate({google_id: req.body.google_id}, {$inc: {'gustos.3.4': 1}}, function (err, user) {
                user.save()
                res.status(200).send()
            })

        }
    },

    getEmotions: function f(req,res) {
        User.findOne({google_id: req.body.google_id},function (err,user) {
            res.status(200).send(user.gustos)
        })
    }


}
