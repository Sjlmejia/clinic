const express = require('express');
const Pacient = require('../pacient');
const multer = require('multer');

const router = express.Router();

const MimeTypeMaP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MimeTypeMaP[file.mimetype];
    let error = new Error('Invalid Mime Type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MimeTypeMaP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});
const upload = multer({storage});

router.post('', upload.single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  console.log('req.body', req.body)
  const pacient = new Pacient({
    drugName: req.body.drugName,
    drugType: req.body.drugType,
    mechanismOfAction: req.body.mechanismOfAction,
    indicationsOrSpectrum: req.body.indicationsOrSpectrum,
    adults: req.body.adults,
    children: req.body.children,
    elderly: req.body.elderly,
    kidneyFailure: req.body.kidneyFailure,
    liverFailure: req.body.liverFailure,
    pregnancyAndLactation: req.body.pregnancyAndLactation,
    bioavailability: req.body.bioavailability,
    maximumConcentration: req.body.maximumConcentration,
    areaDownCurve: req.body.areaDownCurve,
    halfLife: req.body.halfLife,
    proteinBinding: req.body.proteinBinding,
    volumeOfDistribution: req.body.volumeOfDistribution,
    metabolism: req.body.metabolism,
    excretion: req.body.excretion,
    disseminationCNS: req.body.disseminationCNS,
    intracellularConcetracion: req.body.intracellularConcetracion,
    fcRatio: req.body.fcRatio,
    iterectaionDrugs: req.body.iterectaionDrugs,
    sideEffects: req.body.sideEffects,
    contraindications: req.body.contraindications,
    tradenames: req.body.tradenames,
    comments: req.body.comments
  });
  pacient.save().then(data => {
    res.status(201).json({
      message: 'Paciente creado',
      pacient: {
        ...data,
        id: data._id
      }
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'error al crear el paciente'
    });
  });
});

router.put('/:id', upload.single('image'), (req, res, next) => {
  const pacient = new Pacient({
    _id: req.body.id,
    drugName: req.body.drugName,
    drugType: req.body.drugType,
    mechanismOfAction: req.body.mechanismOfAction,
    indicationsOrSpectrum: req.body.indicationsOrSpectrum,
    adults: req.body.adults,
    children: req.body.children,
    elderly: req.body.elderly,
    kidneyFailure: req.body.kidneyFailure,
    liverFailure: req.body.liverFailure,
    pregnancyAndLactation: req.body.pregnancyAndLactation,
    bioavailability: req.body.bioavailability,
    maximumConcentration: req.body.maximumConcentration,
    areaDownCurve: req.body.areaDownCurve,
    halfLife: req.body.halfLife,
    proteinBinding: req.body.proteinBinding,
    volumeOfDistribution: req.body.volumeOfDistribution,
    metabolism: req.body.metabolism,
    excretion: req.body.excretion,
    disseminationCNS: req.body.disseminationCNS,
    intracellularConcetracion: req.body.intracellularConcetracion,
    fcRatio: req.body.fcRatio,
    iterectaionDrugs: req.body.iterectaionDrugs,
    sideEffects: req.body.sideEffects,
    contraindications: req.body.contraindications,
    tradenames: req.body.tradenames,
    comments: req.body.comments
  });
  Pacient.updateOne({ _id: req.params.id }, pacient).then(respuest => {
    res.status(200).json({message: 'Actualizado'});
  });
});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Pacient.find();
  console.log('tessss', pageSize, currentPage);
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(documents => {
    res.status(200).json({
      message: 'OK',
      pacients: documents
    });
  });
});

router.get('/:id', (req, res, next) => {
  Pacient.findById(req.params.id).then(pacient => {
    if (pacient) {
      res.status(200).json(pacient);
    } else {
      res.status(404).json({message: 'Paciente no encontrado'});
    }
  })
});

router.delete('/:id', (req, res, next) => {
  Pacient.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: 'Paciente eliminado'})
  })
});

module.exports = router;
