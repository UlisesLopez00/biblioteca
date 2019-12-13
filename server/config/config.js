// PUERTO
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Conexion a la base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/bibliotecta'
} else {
    urlDB = 'mongodb+srv://admin:EUVqYxJ6owAN4X0q@cluster0-naw0h.mongodb.net/biblioteca'
}

process.env.URLDB = urlDB;

process.env.SEED = process.env.SEED || 'Firma super secreta';

process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '3h';