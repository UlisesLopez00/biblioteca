const express = require('express');
const _ = require('underscore');
const { verificarToken } = require('../middlewares/autenticacion');
const Libro = require('../models/libro');
const app = express();

app.post('/libro', [verificarToken], (req, res) => {
    let body = req.body;
    let libro = new Libro({
        nombre: body.nombre,
        editorial: body.editorial,
        img: body.img
    });
    libro.save((err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libDB
        });
    });
});

app.put('/libro', [verificarToken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['disponible', 'nombre', 'img', 'editorial']);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libDB
        });
    });
});

app.get('/libro', [verificarToken], (req, res) => {
    Libro.find({ disponible: true })
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            });
        });
});

app.delete('/libro/:id', [verificarToken], (req, res) => {
    let id = req.params.id;
    Libro.deleteOne({ _id: id }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (resp.deletedCount === 0) {
            return res.status(200).json({
                ok: false,
                err: {
                    id,
                    msg: "Libro no encontrado"
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
    // Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     return res.status(200).json({
    //         ok: true,
    //         resp
    //     });
    // });
});

module.exports = app;