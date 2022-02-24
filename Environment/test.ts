const mysql = require('mysql');

var result = [];
var getInformationFromDB = function (callback) {
    const pool = dbConnection();
    pool.query('SELECT * FROM userdb.student;', function (err, res, fields) {
        if (err) return callback(err);
        if (res.length) {
            for (var i = 0; i < res.length; i++) {
                result.push(res[i]);
            }
        }
        callback(null, result);
    });
}

function dbConnection() {
    return mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'shroot12',
        database: 'userdb',
        port: 3306,
        debug: false
    });
}
console.log("Call Function");
getInformationFromDB(function (err, result) {
    if (err) console.log("Database error!");
    else console.log('Arun :'+result[1].firstName);
});