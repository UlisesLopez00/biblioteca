const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificarToken } = require('../middlewares/autenticacion');
const Prestamo = require('../models/prestamo');
const app = express();

app.get('/prestamo', [verificarToken], (req, res) => {

    Prestamo.find({ estado: true })

    .exec((err, prestamos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            count: prestamos.length,
            prestamos
        });
    });
});

app.post('/prestamo', [verificarToken], (req, res) => {
    let body = req.body;

    let prestamo = new Prestamo({
        fecha: body.fecha,
        usuario: body.usuario,
        libro: body.libro
    });
    prestamo.save((err, presDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            presDB
        });
    });
});

app.put('/prestamo', [verificarToken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['fecha', 'usuario', 'libro']);

    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, presDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            presDB
        });
    });
});






app.delete('/prestamo', [verificarToken], (req, res) => {
    let id = req.body.id;
    //     Usuario.deleteOne({ _id: id }, (err, resp) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 ok: false,
    //                 err
    //             });
    //         }
    //         if (resp.deletedCount === 0) {
    //             return res.status(200).json({
    //                 ok: false,
    //                 err: {
    //                     id,
    //                     msg: "Usuario no encontrado"
    //                 }
    //             });
    //         }
    //         return res.status(200).json({
    //             ok: true,
    //             resp
    //         });
    //     });
    Prestamo.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;