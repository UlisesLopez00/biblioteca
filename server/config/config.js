// PUERTO
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Conexion a la base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/biblioteca'
} else {
    urlDB = 'mongodb+srv://ulises:TEzx0pH8dOea5QKZ@cluster0-6tqns.mongodb.net/biblioteca'
}

process.env.URLDB = urlDB;

// FIRMA DE JWT
process.env.SEED = process.env.SEED || 'firma-super-secreta';

// //EXPIRE TIME JWT
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '24h';