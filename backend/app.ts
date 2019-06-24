import bodyParser = require("body-parser");
import Pacient = require("./pacient");
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

app.use((req, res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

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
  pacient.save().then(data =>{
    res.status(201).json({
      message: 'Paciente creado',
      id : data._id
    });
  });
});

app.put('/api/pacients/:id',(req,res,next)=>{
  const pacient = new Pacient({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    heightPacient: req.body.heightPacient,
    weightPacient: req.body.weightPacient,
    bloodType: req.body.bloodType,
    sexType: req.body.sexType,
    dni: req.body.dni,
    date: req.body.date
  });
  Pacient.updateOne({
    _id:req.params.id
  }, pacient).then(respuest=>{
    console.log('res', respuest);
    res.status(200).json({message:'Actualizado'});
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

app.delete('/api/pacients/:id', (req,res,next)=>{
  Pacient.deleteOne({_id:req.params.id}).then(result =>{
    res.status(200).json({message:"Paciente eliminado"})
  })
});

export = app;
