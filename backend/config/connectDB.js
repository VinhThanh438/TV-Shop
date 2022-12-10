const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: 'root',
    database: 'tvshop',
    waitForConnections: true,
});

module.exports = pool;
