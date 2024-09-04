const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: '213.136.93.169',
  port: 3306,
  user: 'ki829222_adminkhs',
  password: 'SGPS-12446',
  database: 'ki829222_analisiskh_sena'
});

module.exports = db;
