const { Pool } = require('pg');

// Set up the connection pool
const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: 'localhost', // Host (localhost for local development)
  database: 'information', // Replace with your database name
  password: 'airflow', // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
