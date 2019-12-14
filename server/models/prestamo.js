const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = mongoose.model('Usuario');
const Libro = mongoose.model('Libro');


let Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    fecha: {
        type: String

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, 'Por favor ingresa el id del usuario']
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: "Libro",
        required: [true, 'Por favor ingresa el id del Libro']
    },
    estado: {
        type: Boolean,
        default: true
    },
});

prestamoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Prestamo', prestamoSchema);