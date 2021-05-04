const mysql = require('mysql');

module.exports = mysql.createConnection({
    connectionLimit: 10,
    waitForConnections: true ,
    host    : '192.168.0.81',
    user    : 'fisolution',
    password: 'fis!@#45QWER',
    database: 'account_book',
    port    : '3306'
});