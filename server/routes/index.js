const express = require('express');
const app = express();

app.use(require('./upload'));
app.use(require('./usuario'));
app.use(require('./imagen'));
app.use(require('./login'));
app.use(require('./libro'));
app.use(require('./prestamo'));



module.exports = app;