// Excute the below query to the mysql native epassword

import Environment from "./environment";

//alter user 'root'@'localhost' identified with mysql_native_password by 'shroot12';
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: Environment.dbHost,
  user: Environment.dbUser,
  password: Environment.dbPassword,
  database: Environment.databaseName
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});