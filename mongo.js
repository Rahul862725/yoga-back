const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Yoga").then(()=>{
    console.log("connection succesfull");
}).catch(()=>{
    console.log("Connection Not successfull");
})