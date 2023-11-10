var express = require("express");
const cors = require("cors");
const data = require("./featching/Datamaster.js");

var midusers = require("./acount/AcoountMaster.js");
const cookieSession = require("cookie-session");
const passportsetup = require("passport");
const authrouter = require("./acount/auth.js");

var app = express();
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["uniques"],
    expires: 24 * 60 * 60 * 100,
  })
);

app.use(passportsetup.initialize());
app.use(passportsetup.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

const port = process.env.port || 8080;
app.use("/user", midusers);
app.use("/auth", authrouter);
app.listen(port, () => {
  console.log(`server is running on : localhost:${port}`);
});
