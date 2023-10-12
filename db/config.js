let mysql = require('mysql2')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',

    database: 'tracker_db'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;