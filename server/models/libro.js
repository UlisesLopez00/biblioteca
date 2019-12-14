const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let libroSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre del libro']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        //required: [true, 'Por favor ingresa la imagen del libro']
    },
    editorial: {
        type: String,
        required: [true, 'Por favor ingresa la editorial']
    },
});

libroSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model("Libro", libroSchema);