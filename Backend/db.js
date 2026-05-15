const db = require('mysql2');
require('dotenv').config();

const pool = db.createPool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

module.exports = pool.promise();