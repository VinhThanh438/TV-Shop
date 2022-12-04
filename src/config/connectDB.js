const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    password: '',
    user: 'root',
    database: 'TV_Shop',
});

module.exports = pool;
