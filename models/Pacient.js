var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var pacienteSchema = new Schema({
    nombre: String,
    edad: String,
    genero: String,
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
            memoria: Double,
            orientacion: Double,
            juicio: Double
        },
        informante: {
            memoria: Double,
            orientacion: Double,
            juicio: Double,
            actividadesC: Double,
            actividadesD: Double,
            cuidadoP: Double
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
        respuesta: [Integer],
        imagen: Boolean,
        rutaImagen: String
    }],
    resultados:[{
        fecha: Date,
        area: String,
        emocion: String,
        acierto: Boolean,
        tiempoSeg: Integer,
        idPregunta: ObjectId
    }]
}, {collection: 'pacientes'});
module.exports = mongoose.model('User', pacienteSchema);