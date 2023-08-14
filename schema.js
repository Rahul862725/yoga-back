const mongoose = require('mongoose')

const user = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const userInfo = new mongoose.model("Visiter",user);
module.exports = userInfo;