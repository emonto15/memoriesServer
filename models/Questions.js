let mongoose = require('mongoose')
require('mongoose-double')(mongoose);
let schema = mongoose.Schema,
    schemaTypes = schema.Types;
let questionsSchema = new schema({
    idArea: Number,
    subAreas: [{
        id: Number,
        preguntas: [{
            pregunta: String,
            opciones: [String],
            respuestaSel: String,
            respuestaSec: [String],
            imagen: Boolean,
            ifSec: Boolean,
            rutaImagen: String
        }]
    }],
}, {collection: 'questions'});
module.exports = mongoose.model('Questions', questionsSchema);