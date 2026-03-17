const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  
  user: "root",
  password: "273023",
  database: "portfolio"
});

db.connect(function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Database Connected");
  }
});

module.exports = db;