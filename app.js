 const express = require('express')
 const app = express()
 const post=require("./routes/post");
 const morgan = require("morgan");
 const dotenv =require('dotenv');
 const mongoose = require("mongoose");
 const bodyParser=require("body-parser");
 const cookieParser=require('cookie-parser');
 const cors=require('cors');
 const expressvalidator=require("express-validator");

  const auth=require("./routes/auth");
 
 dotenv.config();
 
 //connecting mango db
 mongoose.connect(process.env.MANGO_URI, { useNewUrlParser: true ,useUnifiedTopology: true })
 .then(()=>console.log("DB connected"));

 mongoose.connection.on("error",err=>{
 console.log(`Db connection error : ${err.message}`)});
 
 


  
//middlewares
 app.use(morgan("dev"));
 app.use(bodyParser.json());
 app.use(cookieParser());


app.use(cors());


//for validate
  app.use(expressvalidator());

  //routes
app.use('/',post);
app.use('/',auth);
//for reqsignin error handling(UnauthorizedError)
 app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"unauthorizedError"});
  }
});
const port=process.env.PORT || 8080

app.listen(port , ()=>{console.log(`server is stared at port : ${port}`)});

