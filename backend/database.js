const mysql = require('mysql2')
require('dotenv').config()


const pool= mysql.createConnection({
    port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  user: process.env.DB_USER,
//   connectionLimit: 100,
//   acquireTimeout: 1000000,
})

pool.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to pool database!');
  });



  const connect=mysql.createConnection({
  port: process.env.DB_PORT2,
  host: process.env.DB_HOST2,
  password: process.env.DB_PASS2,
  database: process.env.MYSQL_DB2,
  user: process.env.DB_USER2,
//   connectionLimit: 100,
//   acquireTimeout: 1000000,
  })

  connect.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to conect database!');
  });


  module.exports={pool,connect}