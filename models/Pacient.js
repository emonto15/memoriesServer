var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var schema = mongoose.Schema,
    schemaTypes = schema.Types;
var pacienteSchema = new schema({
    nombre: String,
    edad: String,
    genero: String,
    google_id: String,
    registrado: Boolean,
    direccion: String,
    departamento_nacimiento: String,
    ciudad_nacimiento: String,
    lugar_residencia: String,
    fecha_nacimiento: Date,
    ocupacion_principal: String,
    escolaridad: String,
    colegio: String,
    estado_civil: String,
    fecha_matrimonio: Date,
    pasatiempo: String,
    genero_musical: String,
    capacidad_fisica: String,
    capacidad_caminar: String,
    familiares: [{
        nombre: String,
        parentesco: String
    }],
    test: [{
        fecha: Date,
        memoria: schemaTypes.Double,
        orientacion: schemaTypes.Double,
        juicio: schemaTypes.Double
    }],
    resultados: [{
        fecha: Date,
        memoria: schemaTypes.Double,
        orientacion: schemaTypes.Double,
        juicio: schemaTypes.Double
    }],
    gustos: {
        1: { //memoria
            1: Number, //cualNo
            2: Number, //cual
            3: Number //info
        },
        2: { //orientacion
            1: Number, //fecha
            2: Number //situacion
        },
        3: { //juicio
            1: Number, //calculo
            2: Number, //semejanzas
            3: Number, //diferencias
            4: Number //secuencias
        }
    }
}, {collection: 'pacientes'});
module.exports = mongoose.model('Users', pacienteSchema);