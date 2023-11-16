const db = require("mysql");
var conn = db.createConnection({
  password: "",
  host: "localhost",
  user: "root",
  database: "dbshop",
});
conn.connect((err) => {
  if (err) {
    console.log(err.message);
    console.log("connected");
  }
});
module.exports = conn;
