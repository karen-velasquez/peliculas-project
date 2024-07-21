const { Pool } = require('pg');

// Configura los detalles de conexión a tu base de datos
const pool = new Pool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'peliculas'
});

module.exports = { pool };