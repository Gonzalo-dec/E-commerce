const db = require('mysql2');
require('dotenv').config();

const pool = db.createPool({
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'ecommerce'
});

module.exports = pool.promise();