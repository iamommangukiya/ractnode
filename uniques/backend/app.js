var express =require("express")
const cors = require('cors');
const data = require('./featching/Datamaster.js')
//import express from 'express'
var midusers=require("./acount/AcoountMaster.js");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportsetup = require('./passport.js')
const authrouter = require('./acount/auth.js')

var app=express()
app.use(express.json());
app.use(cookieSession(
 {
    name:"session",
     keys:["uniques"],
     expires:24*60*60*100,
 }
))

app.use(passport.initialize())
app.use(passport.session())

app.use(

    cors(
        {
            origin:"http://localhost:3000/",
            methods:"GET,POST,DELETE,PUT",
            credentials:true
        }
    )
)


const port = process.env.port || 8080
app.use("/user",midusers)
app.listen(port,()=>{

    console.log(`server is running on : localhost:${port}`);
})
