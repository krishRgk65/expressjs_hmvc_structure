const mysql = require("mysql");
// const dbConfig = require("../config/config.db.js");
const dbConfig = require("../../users/config/config.db.js");
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database users.");
});
module.exports = connection;