var express = require("express");
var app = express();
var port = process.env.PORT || 8000;
var cors = require("cors");
var user = require("./Routes/accountMaster");
var data = require("./Routes/shopDataMaster");
const session = require("express-session");
//configure session
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

//using json express
app.use(express.json());
//configure user path
app.use("/user", user);
//configure cros
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
//configure data path
app.use("/", data);

//app listning
app.listen(port, () => {
  console.log(`server listen on port : ${port}`);
});
