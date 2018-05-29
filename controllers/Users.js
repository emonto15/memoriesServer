const mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    crypto = require('crypto'),
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

        user.save(function (err,u) {
            if (err)
                console.log(err);
            else
                res.send(u)
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

    nextRound: async function f(req, res) {
        var op = ["Daniel", "Edwin", "Patricia", "Estefanía"]
        User.findOne({google_id: req.body.google_id}, function (err, user) {
            if (user) {
                console.log("cono")
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
                memoria = 0
                juicio = 0
                orientacion = 0
                user.resultados.forEach(function (ultimo) {
                    memoria += ultimo.memoria
                    juicio += ultimo.juicio
                    orientacion += ultimo.orientacion
                })
                memoria = memoria / user.resultados.length
                juicio = juicio / user.resultados.length
                orientacion = orientacion / user.resultados.length

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
                console.log(peorTest, peorQuiz)
                var options = [1, 2, 3]
                var p, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10

                var subareas, keys, valAux, max, randArea, subArea
                var ids = []

                if (peorTest == peorQuiz) {
                    options.splice(options.indexOf(peorTest), 1)
                    subareas = user.gustos[peorTest.toString()]
                    keys = Object.keys(subareas.toJSON())
                    valAux = Object.values(subareas.toJSON())
                    max = Math.max(...valAux)
                    Question.findOne({idArea: peorTest}, function (err, area) {
                        area.subAreas.forEach(function (val) {
                            if (val.id == keys[valAux.indexOf(max)]) {

                                //3 primeras de la peorTest area y subarea con la mejor emocion
                                p1 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON();
                                p1.area = area.idArea
                                p1.subArea = val.id
                                ids.push(p1._id)
                                p2 = val.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * val.preguntas.length)].toJSON();
                                (function iterator() {
                                    if (ids.includes(p2._id)) {
                                        p2 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON();
                                        iterator()
                                    } else {
                                        ids.push(p2._id)
                                        p2.area = area.idArea
                                        p2.subArea = val.id
                                        return;
                                    }
                                })()
                                p3 = val.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * val.preguntas.length)].toJSON();
                                (function iterator() {
                                    if (ids.includes(p3._id)) {
                                        p3 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON();
                                        iterator()
                                    } else {
                                        ids.push(p3._id)
                                        p3.area = area.idArea
                                        p3.subArea = val.id
                                        return;
                                    }
                                })()
                                //3 Aleatorias de las demas subareas
                                subArea = area.subAreas[Math.floor(Math.random() * area.subAreas.length)]
                                p4 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                (function iterator() {
                                    if (ids.includes(p4._id)) {
                                        p4 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                        iterator()
                                    } else {
                                        ids.push(p4._id)
                                        p4.area = area.idArea
                                        p4.subArea = subArea.id
                                        return;
                                    }
                                })()
                                subArea = area.subAreas[Math.floor(Math.random() * area.subAreas.length)]
                                p5 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                (function iterator() {
                                    if (ids.includes(p5._id)) {
                                        p5 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                        iterator()
                                    } else {
                                        ids.push(p5._id)
                                        p5.area = area.idArea
                                        p5.subArea = subArea.id
                                        return;
                                    }
                                })()
                                subArea = area.subAreas[Math.floor(Math.random() * area.subAreas.length)]
                                p6 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                (function iterator() {
                                    if (ids.includes(p6._id)) {
                                        p6 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                        iterator()
                                    } else {
                                        ids.push(p6._id)
                                        p6.area = area.idArea
                                        p6.subArea = subArea.id
                                        return;
                                    }
                                })()
                                while (ids.includes(p6._id)) {
                                    p6 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                }


                                randInt = Math.floor(Math.random() * (options.length - 1))
                                console.log(randInt)
                                randArea = options[randInt]
                                options.splice(options.indexOf(randArea), 1)
                                //Siguiente area aleatoria para seleccionar 2 pregs
                                Question.findOne({idArea: randArea}, function (err, area1) {
                                    subareas = user.gustos[randArea]
                                    keys = Object.keys(subareas.toJSON())
                                    valAux = Object.values(subareas.toJSON())
                                    max = Math.max(...valAux)
                                    area1.subAreas.forEach(function (val1) {
                                        console.log(val1.id, 'o', keys[valAux.indexOf(max)])
                                        if (val1.id == keys[valAux.indexOf(max)]) {
                                            // 1 obtener la subarea con la mejor emocion
                                            p7 = val1.preguntas[Math.floor(Math.random() * val1.preguntas.length)].toJSON();
                                            (function iterator() {
                                                if (ids.includes(p7._id)) {
                                                    p7 = val1.preguntas[Math.floor(Math.random() * val1.preguntas.length)].toJSON();
                                                    iterator()
                                                } else {
                                                    ids.push(p7._id)
                                                    p7.area = area1.idArea
                                                    p7.subArea = val1.id
                                                    return;
                                                }
                                            })()
                                            //subarea aleatoria
                                            subArea = area1.subAreas[Math.floor(Math.random() * area1.subAreas.length)]
                                            p8 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                            (function iterator() {
                                                if (ids.includes(p8._id)) {
                                                    p8 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                                    iterator()
                                                } else {
                                                    ids.push(p8._id)
                                                    p8.area = area1.idArea
                                                    p8.subArea = subArea.id
                                                    return;
                                                }
                                            })()

                                            //Area restante 2 pregs
                                            Question.findOne({idArea: options[0]}, function (err, area2) {
                                                subareas = user.gustos[options[0]]
                                                keys = Object.keys(subareas.toJSON())
                                                valAux = Object.values(subareas.toJSON())
                                                max = Math.max(...valAux)
                                                area2.subAreas.forEach(function (val2) {
                                                    if (val2.id == keys[valAux.indexOf(max)]) {
                                                        //1 obtener la subarea con la mejor emocion
                                                        p9 = val2.preguntas[Math.floor(Math.random() * val2.preguntas.length)].toJSON();
                                                        (function iterator() {
                                                            if (ids.includes(p9._id)) {
                                                                p9 = val2.preguntas[Math.floor(Math.random() * val2.preguntas.length)].toJSON();
                                                                iterator()
                                                            } else {
                                                                ids.push(p9._id)
                                                                p9.area = area2.idArea
                                                                p9.subArea = val2.id
                                                                return;
                                                            }
                                                        })()
                                                        //1 subarea aleatoria
                                                        subArea = area2.subAreas[Math.floor(Math.random() * area2.subAreas.length)]

                                                        p10 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                                        (function iterator() {
                                                            if (ids.includes(p10._id)) {
                                                                p10 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                                                iterator()
                                                            } else {
                                                                ids.push(p10._id)
                                                                p10.area = area2.idArea
                                                                p10.subArea = subArea.id
                                                                return;
                                                            }
                                                        })()
                                                        console.log(p10)
                                                        //p = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]
                                                        var nombre = user.nombre
                                                        p10 = {
                                                            respuestaSec: [],
                                                            pregunta: "¿Cuál es tu nombre?",
                                                            respuestaSel: nombre,
                                                            imagen: false,
                                                            ifSec: false,
                                                            rutaImagen: null,
                                                            area: 1,
                                                            subArea: 1

                                                        }
                                                        if (op.includes(nombre)) {
                                                            p10.opciones = op
                                                        } else {
                                                            op.pop()
                                                            op.push(nombre)
                                                            p10.opciones = op
                                                        }
                                                        p = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]

                                                        console.log(p.length)
                                                        ids = []
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
                    ids = []
                    options.splice(options.indexOf(peorTest), 1)
                    subareas = user.gustos[peorTest.toString()]
                    keys = Object.keys(subareas.toJSON())
                    valAux = Object.values(subareas.toJSON())
                    max = Math.max(...valAux)
                    Question.findOne({idArea: peorTest}, function (err, area) {
                        console.log("ACA")
                        area.subAreas.forEach(function (val) {
                            if (val.id == keys[valAux.indexOf(max)]) {
                                console.log("DOS")
                                //2 primeras de la peorTest area y subarea con la mejor emocion
                                p1 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON();
                                p1.area = area.idArea
                                p1.subArea = val.id
                                ids.push(p1._id)
                                p2 = val.preguntas[Math.floor(Math.random() * val.preguntas.length)].toJSON();
                                (function iterator() {
                                    if (ids.includes(p2._id)) {
                                        console.log(val.preguntas)
                                        var a = Math.floor(Math.random() * val.preguntas.length)
                                        p2 = val.preguntas[a].toJSON()
                                        console.log(p2)
                                        iterator()
                                    } else {
                                        ids.push(p2._id)
                                        p2.area = area.idArea
                                        p2.subArea = val.id
                                        return;
                                    }
                                })();

                                subArea = area.subAreas[Math.floor(Math.random() * area.subAreas.length)]
                                p3 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                (function iterator() {
                                    if (ids.includes(p3._id)) {
                                        p3 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                        iterator()
                                    } else {
                                        ids.push(p3._id)
                                        p3.area = area.idArea
                                        p3.subArea = subArea.id
                                        return;
                                    }
                                })()
                                //3 Aleatorias de las demas subareas
                                subArea = area.subAreas[Math.floor(Math.random() * area.subAreas.length)]
                                p4 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                (function iterator() {
                                    if (ids.includes(p4._id)) {
                                        p4 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                        iterator()
                                    } else {
                                        ids.push(p4._id)
                                        p4.area = area.idArea
                                        p4.subArea = subArea.id
                                        return;
                                    }
                                })()
                                options.splice(options.indexOf(peorQuiz), 1)
                                //Siguiente area aleatoria para seleccionar 2 pregs
                                Question.findOne({idArea: peorQuiz}, function (err, area1) {
                                    subareas = user.gustos[peorQuiz]
                                    keys = Object.keys(subareas.toJSON())
                                    valAux = Object.values(subareas.toJSON())
                                    max = Math.max(...valAux)
                                    area1.subAreas.forEach(function (val1) {
                                        if (val1.id == keys[valAux.indexOf(max)]) {
                                            // 1 obtener la subarea con la mejor emocion
                                            p5 = val1.preguntas[Math.floor(Math.random() * val1.preguntas.length)].toJSON();
                                            (function iterator() {
                                                if (ids.includes(p5._id)) {
                                                    p5 = val1.preguntas[Math.floor(Math.random() * val1.preguntas.length)].toJSON();
                                                    iterator()
                                                } else {
                                                    ids.push(p5._id)
                                                    p5.area = area1.idArea
                                                    p5.subArea = val1.id
                                                    return;
                                                }
                                            })()
                                            p6 = val1.preguntas[Math.floor(Math.random() * val1.preguntas.length)].toJSON();
                                            (function iterator() {
                                                if (ids.includes(p6._id)) {
                                                    p6 = val1.preguntas[Math.floor(Math.random() * val1.preguntas.length)].toJSON();
                                                    iterator()
                                                } else {
                                                    ids.push(p6._id)
                                                    p6.area = area1.idArea
                                                    p6.subArea = val1.id
                                                    return;
                                                }
                                            })()
                                            //subarea aleatoria
                                            subArea = area1.subAreas[Math.floor(Math.random() * area1.subAreas.length)]
                                            p7 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                            (function iterator() {
                                                if (ids.includes(p7._id)) {
                                                    p7 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                                    iterator()
                                                } else {
                                                    ids.push(p7._id)
                                                    p7.area = area1.idArea
                                                    p7.subArea = subArea.id
                                                    return;
                                                }
                                            })()
                                            subArea = area1.subAreas[Math.floor(Math.random() * area1.subAreas.length)]
                                            p8 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                            (function iterator() {
                                                if (ids.includes(p8._id)) {
                                                    p8 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                                    iterator()
                                                } else {
                                                    ids.push(p8._id)
                                                    p8.area = area1.idArea
                                                    p8.subArea = subArea.id
                                                    return;
                                                }
                                            })()
                                            //Area restante 2 pregs
                                            Question.findOne({idArea: options[0]}, function (err, area2) {
                                                subareas = user.gustos[options[0]]
                                                keys = Object.keys(subareas.toJSON())
                                                valAux = Object.values(subareas.toJSON())
                                                max = Math.max(...valAux)
                                                area2.subAreas.forEach(function (val2) {
                                                    if (val2.id == keys[valAux.indexOf(max)]) {
                                                        //1 obtener la subarea con la mejor emocion
                                                        p9 = val2.preguntas[Math.floor(Math.random() * val2.preguntas.length)].toJSON();
                                                        (function iterator() {
                                                            if (ids.includes(p9._id)) {
                                                                p9 = val2.preguntas[Math.floor(Math.random() * val2.preguntas.length)].toJSON();
                                                                iterator()
                                                            } else {
                                                                ids.push(p9._id)
                                                                p9.area = area2.idArea
                                                                p9.subArea = val2.id
                                                                return;
                                                            }
                                                        })()

                                                        //1 subarea aleatoria
                                                        subArea = area2.subAreas[Math.floor(Math.random() * area2.subAreas.length)]
                                                        p10 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                                        (function iterator() {
                                                            if (ids.includes(p10._id)) {
                                                                p10 = subArea.preguntas[Math.floor((crypto.randomBytes(1024)[Math.floor(Math.random() * 1024)] / 255) * subArea.preguntas.length)].toJSON();
                                                                iterator()
                                                            } else {
                                                                ids.push(p10._id)
                                                                p10.area = area2.idArea
                                                                p10.subArea = subArea.id
                                                                return;
                                                            }
                                                        })()
                                                        console.log(ids)
                                                        ids = []
                                                        //p = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]
                                                        var nombre = user.nombre
                                                        p10 = {
                                                            respuestaSec: [],
                                                            pregunta: "¿Cuál es tu nombre?",
                                                            respuestaSel: nombre,
                                                            imagen: false,
                                                            ifSec: false,
                                                            rutaImagen: null,
                                                            area: 1,
                                                            subArea: 1
                                                        }
                                                        if (op.includes(nombre)) {
                                                            p10.opciones = op
                                                        } else {
                                                            op.pop()
                                                            op.push(nombre)
                                                            p10.opciones = op
                                                        }
                                                        p = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]
                                                        console.log(p)
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
            } else {
                res.status(404).send("Daniel el pelele")
            }
        })
    },

    quizAnswersUpload: function f(req, res) {
        console.log(req.body)
        User.findOne({google_id: req.body.google_id}, function (err, user) {
            if (user) {
                var resultado = {
                    fecha: req.body.fecha,
                    memoria: req.body.memoria,
                    orientacion: req.body.orientacion,
                    juicio: req.body.juicio
                }
                user.resultados.push(resultado)
                user.save(function (err) {
                    if (!err) {
                        res.status(200).send()
                    }
                });
            } else {
                res.status(400).send()
            }

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

    getEmotions: function f(req, res) {
        User.findOne({google_id: req.body.google_id}, function (err, user) {
            res.status(200).send(user.gustos)
        })
    }


}
