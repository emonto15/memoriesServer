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
    pasatiempo:String,
    genero_musical: String,
    capacidad_fisica: String,
    capacidad_caminar: String,
    familiares: [{
        nombre: String,
        parentesco: String
    }],
    test: [{
        fecha: Date,
        paciente: {
            memoria: schemaTypes.Double,
            orientacion: schemaTypes.Double,
            juicio: schemaTypes.Double
        },
        informante: {
            memoria: schemaTypes.Double,
            orientacion: schemaTypes.Double,
            juicio: schemaTypes.Double
        }
    }],
    actividadesSeleccion: [{
        area: String,
        pregunta: String,
        opciones: [String],
        respuesta: String,
        imagen: Boolean,
        rutaImagen: String
    }],
    actividadesSecuencia: [{
        area: String,
        pregunta: String,
        opciones: [String],
        respuesta: [Number],
        imagen: Boolean,
        rutaImagen: String
    }],
    resultados:[{
        fecha: Date,
        area: String,
        emocion: String,
        acierto: Boolean,
        tiempoSeg: Number,
        idPregunta: schema.ObjectId
    }]
}, {collection: 'pacientes'});
module.exports = mongoose.model('Users', pacienteSchema);