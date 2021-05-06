const mysql = require("mysql");

module.exports = {
  db: mysql.createConnection({
    host: "192.168.0.117",
    user: "fis_user1",
    password: "fis!@#45QWER",
    database: "fis_police21",
  }),
};
