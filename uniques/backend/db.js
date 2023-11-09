var mysql = require("mysql")

var db=mysql.createConnection({
   
    host: 'localhost',
  user: 'root',
  password: '',
  database: 'uniques'

})
 db.connect((err)=>{
     if (err) return console.log(err);
})
module.exports= db


