import express = require('express');
import Attend = require('../attend');
import multer = require('multer');

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
  const attend = new Attend({
    idPacient: req.body.idPacient,
    description: req.body.description,
    date: req.body.date,
  });
  console.log('attend', attend)
  attend.save().then(data => {
    res.status(201).json({
      message: 'attende creado',
      attend: {
        ...data,
        id: data._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'error al crear el attende'
    });
  });
});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Attend.find();
  console.log('tessss', pageSize, currentPage);
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(documents => {
    res.status(200).json({
      message: 'OK',
      attends: documents
    });
  });
});

router.get('/:id', (req, res, next) => {
  const postQuery = Attend.find({ idPacient: req.params.id});
  postQuery.then(documents => {
    res.status(200).json({
      message: 'OK',
      attends: documents
    });
  });
});
export = router;
