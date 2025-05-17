const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mental_health_journey',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  // ...you can add more options here if needed
});

module.exports = pool;
