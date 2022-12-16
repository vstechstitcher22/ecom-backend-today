const mongoose = require('mongoose')
const express = require('express')
const app = express(); 
require("dotenv").config();


const url = process.env.DATABASE;


mongoose.connect(url,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() =>{
        console.log('server running')  
}).catch(error =>{
    console.log("Error",error.message)
})
