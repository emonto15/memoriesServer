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
    lugar_nacimiento: String,
    fecha_nacimiento: Date,
    ocupacion: String,
    escolaridad: String,
    familiares: [{
        nombre: String,
        edad: String,
        genero: String,
        parentesco: String,
        hijos: [{
            nombre: String,
            edad: String,
            genero: String,
            parentesco: String
        }]
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
            juicio: schemaTypes.Double,
            actividadesC: schemaTypes.Double,
            actividadesD: schemaTypes.Double,
            cuidadoP: schemaTypes.Double
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