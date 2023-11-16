const express = require("express");
const router = express.Router();
const db = require("../db");
const session = require("express-session");
const crypto = require("crypto-js");
const secretkey = "om mangukiya";

router.post("/create", (req, res) => {
  const { email, name, password } = req.body;
  var Encpassword = crypto.SHA256(password).toString(crypto.enc.Hex);

  var q = `select * from tblusers where name = ? OR email =?`;
  db.query(q, [name, email], (err, data) => {
    if (err) {
      return res.status(400).send("error");
    } else {
      if (data.length > 0) {
        return res
          .status(400)
          .send({ message: "User already exists", error: true });
      } else {
        var q = "insert into tblusers(email,name,password) values (?,?,?)";

        db.query(q, [email, name, Encpassword], (err, data) => {
          if (err) {
            return res.status(500).send({ message: err.message, error: true });
          }
          return res.status(201).send({ message: "inserted" });
        });
      }
    }
  });
});

router.get("/show", (req, res) => {
  var q = "select * from tblusers";
  var a = db.query(q, (err, data) => {
    return res.send(data);
  });
});

router.post("/login", (req, res) => {
  let { name, email, password } = req.body;
  let encpass = crypto.SHA256(password).toString(crypto.enc.Hex);
  if (name.trim() && name != "") {
    console.log("in name");
    var q = "SELECT * FROM tblusers WHERE  name = ? AND password = ?";
    db.query(q, [name, password], (err, data) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      if (data.length > 0) {
        res.status(200).send("Login successfully");
        req.session.user = {
          userId: data[0].id,
          userName: data[0].name,
          userEmail: data[0].email,
        };
      } else {
        var q =
          "SELECT * FROM tblusers WHERE (email = ? OR name = ?) AND password = ?";
        db.query(q, [email, name, encpass], (err, data) => {
          if (err) {
            return res.status(500).send(err.message);
          } else {
            if (data.length > 0) {
              req.session.user = {
                userId: data[0].id,
                userName: data[0].name,
                userEmail: data[0].email,
              };

              return res
                .status(200)
                .send(`Login successful ${req.session.user.userName}`);
            } else {
              return res.status(401).send("Not authenticated");
            }
          }
        });
      }
    });
  }
});

module.exports = router;
