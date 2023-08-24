const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Chocolate123',
  database: 'employee_db'
});

module.exports = connection;