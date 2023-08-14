const express = require('express');
const port = process.env.PORT || 8000;
const body_Parser = require('body-parser');
const nodemailer = require('nodemailer')
require('./mongo.js');
const UserInfo = require('./schema.js');

const sendEmail = async(obj)=>{
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'rahulk95287070@gmail.com',
        pass: process.env.pass
      }
    });
    const message1 = {
      from:'rahulk95287070@gmail.com',
      to:'priyankaverma10351@gmail.com',
      subject:'Mail Send From YOGA',
      text:obj.message,
      html: `
      <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${obj.fullName}</li>
            <li>Email: ${obj.email}</li>
            <li>Message from user: ${obj.message}</li>
        </ul>
      `
    }

    try{
      const info = await transporter.sendMail(message1);
    }
    catch(err){
      console.log('Error: ',err);
    }
}

const app = express();
app.use(express.json());
app.use(body_Parser.urlencoded());
app.get('/getContact',async(req,res)=>{
    const data = await UserInfo.find();
    res.send(data);
})
app.get('/',(req,res)=>{

    res.send("Hlo Bhaiya And this server is created by Pinku");
})
app.post('/contact',async(req,res)=>{
    const data = req.body;
    // console.log("ddkdkkdkd"+data.email);
    await sendEmail(data);
    try{
        await UserInfo.create(data);
        res.send("Added")
    }
    catch(error){
        console.log("Information not added");
    }
})
app.listen(port,()=>{
    console.log(`Port : ${port}`)
})

