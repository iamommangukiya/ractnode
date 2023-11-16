var express = require("express");
var db = require("../db");
var router = express.Router();

router.get("/featchData", (req, res) => {
  var q = "select * from tbldata ";
  db.query(q, (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
});

router.post("/addData", (req, res) => {
  let { item, dis, price, discount, quantity } = req.body;
  var q =
    "INSERT INTO tbldata (item, dis, price, discount, quantity) VALUES (?, ?, ?, ?, ?)";
  db.query(q, [item, dis, price, discount, quantity], (err, data) => {
    if (err) {
      res.status(400).send(err.message);
      console.error(err.message);
    } else {
      res.status(201).send({ message: "Data inserted successfully" });
    }
  });
});
router.post("/updateData", (req, res) => {
  let { id, item, dis, price, discount, quantity } = req.body;
  var q = `UPDATE tbldata SET item = ?, dis = ?, price = ?, discount = ?, quantity = ? WHERE id = ?`;

  db.query(q, [item, dis, price, discount, quantity, id], (err, data) => {
    if (err) {
      res.status(400).send(err.message);
      console.error(err.message);
    } else {
      res.status(200).send({ message: "Data updated successfully" });
    }
  });
});

module.exports = router;
