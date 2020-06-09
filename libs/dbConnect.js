const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  // port : "3306",
  user: "root",
  password: "",
  database: "saddaddapanel"
});

//open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
