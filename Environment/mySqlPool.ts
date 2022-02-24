const mysqlpoolCon = require('mysql');

export class mysqlpool {
    public executeQuery(str: string): void {
        var result = [];
        const pool = dbConnection();
        pool.query(str, function (err, res) {
            if (err) return (err);
            if (res.length) {
                for (var i = 0; i < res.length; i++) {
                    result.push(res[i]);
                }
                console.log('inside 0  : ' + result[0].firstName)
            }
            console.log('inside 1 : ' + result[1].firstName)
            return [...result];
        })

    }
}

function dbConnection() {
    return mysqlpoolCon.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'shroot12',
        database: 'userdb',
        port: 3306,
        debug: false
    });
}

