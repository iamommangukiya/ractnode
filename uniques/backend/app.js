var express =require("express")
const cors = require('cors');
const data = require('./featching/Datamaster.js')
//import express from 'express'
var midusers=require("./acount/AcoountMaster.js")


var app=express()
app.use(express.json());
app.use(cors())


const port = process.env.port || 8080
app.use("/user",midusers)
app.listen(port,()=>{

    console.log(`server is running on : localhost:${port}`);
})
