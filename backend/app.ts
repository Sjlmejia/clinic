import bodyParser = require("body-parser");
import Pacient = require("./post");
import express = require('express');
import mongoose = require("mongoose");

const app: express.Application = express();
mongoose.connect("mongodb://localhost:27017/PacientsDB", {useNewUrlParser: true})
 .then(() =>{
   console.log('se conecto');
 })
 .catch((res)=>{
  console.log('No se conecto', res);
 });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// app.set('port', '3000');
app.use((req, res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
// jorge MNjBcN64wvAvp4GR
app.post("/api/pacients",(req,res,next)=>{
  const pacient = new Pacient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    heightPacient: req.body.heightPacient,
    weightPacient: req.body.weightPacient,
    bloodType: req.body.bloodType,
    sexType: req.body.sexType,
    dni: req.body.dni,
    date: req.body.date
  });
  pacient.save();
  res.status(201).json({
    message: 'Paciente creado'
  });
});
app.get('/api/pacients',(req, res,next)=>{
  Pacient.find().then(documents =>{
    res.status(200).json({
      message:"OK",
      pacients: documents
    });
  });
});

export = app;
