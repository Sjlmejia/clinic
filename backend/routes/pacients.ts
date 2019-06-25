import express = require('express');
import Pacient = require("../pacient");

const router = express.Router();

router.post('',(req,res,next)=>{
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

router.put('/:id',(req,res,next)=>{
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
  Pacient.updateOne({ _id:req.params.id }, pacient).then(respuest=>{
    res.status(200).json({message:'Actualizado'});
  });
});

router.get('',(req, res,next)=>{
  Pacient.find().then(documents =>{
    res.status(200).json({
      message:"OK",
      pacients: documents
    });
  });
});

router.get('/:id',(req,res,next) =>{
  Pacient.findById(req.params.id).then(pacient =>{
    if(pacient) {
      res.status(200).json(pacient);
    } else {
      res.status(404).json({message: 'Paciente no encontrado'});
    }
  })
});

router.delete('/:id', (req,res,next)=>{
  Pacient.deleteOne({_id:req.params.id}).then(result =>{
    res.status(200).json({message:"Paciente eliminado"})
  })
});

export = router;
