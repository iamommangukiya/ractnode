const express = require("express");
const db = require("../db.js");
const CryptoJS = require("crypto-js");
//const bcrypt = require("bcrypt")
// router
const router = express.Router();

const secretKey = "9998abc";

// Acoount creation
router.post("/create", async (req, res) => {
  const { username, email, password } = req.body;

  var npassword = password + secretKey;
  const SecurePass = CryptoJS.SHA256(npassword).toString(CryptoJS.enc.Hex);

  const check = `SELECT * FROM users WHERE Email = '${email}' `;
  const checkuser = `SELECT * FROM users WHERE Uname = '${username}' `;

  db.query(checkuser, (err, data) => {
    if (err) {
      return res.status(err.code).send("error eccors");
    } else {
      if (data.length > 0) {
        res.send("username alredy exist");
      } else {
        db.query(check, (err, data) => {
          if (err) {
            res.status(500).send("error");
          } else {
            if (data.length > 0) {
              return res.send("email alredy ragistred");
            } else {
              const q = `INSERT INTO users (Email, Uname, Pswd) VALUES (?, ?, ?)`;

              db.query(q, [email, username, SecurePass], (err, data) => {
                if (err) {
                  console.log(err.message);
                  res.status(500).send("Account creation failed");
                } else {
                  res.status(201).send("Account created successfully");
                }
              });
            }
          }
        });
      }
    }
  });
});
router.post("/login", async (req, res) => {
  var Name = req.body.name;

  var email = req.body.email;

  var password = req.body.password;
  var npassword = password + secretKey;
  const SecurePass = CryptoJS.SHA256(npassword).toString(CryptoJS.enc.Hex);
  if (email && email.trim() !== "") {
    console.log("email");

    const q = `SELECT * FROM users WHERE Email = '${email}' AND Pswd = '${SecurePass}'`;

    db.query(q, (err, data) => {
      if (err) {
        console.error(err); // Log the error
        res.status(500).send("Login failed");
      } else {
        if (data.length > 0) {
          res.status(201).send("Login success");
        } else {
          res.status(401).send("Login failed");
        }
      }
    });
  } else {
    console.log(Name);
    const qe = `SELECT * FROM users WHERE UName = '${Name}' AND Pswd = '${SecurePass}'`;

    db.query(qe, (err, data) => {
      if (err) {
        console.error(err); // Log the error
        res.status(500).send("Login failed");
      } else {
        if (data.length > 0) {
          res.status(201).send("Login success");
        } else {
          res.status(401).send("Login failed");
        }
      }
    });
  }
});

module.exports = router;
