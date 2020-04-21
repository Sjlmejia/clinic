import bodyParser = require('body-parser');
import express = require('express');
import mongoose = require('mongoose');
import path = require('path');

import pacientsRoutes = require('./routes/pacients');
import attendsRoutes = require('./routes/attends');
const app: express.Application = express();
mongoose.connect('mongodb://localhost:27017/MedicamentosDB', {useNewUrlParser: true})
 .then(() => {
   console.log('se conecto');
 })
 .catch((res) => {
  console.log('No se conecto', res);
 });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
  );
  next();
});

app.use('/api/pacients', pacientsRoutes);
app.use('/api/attends', attendsRoutes);
export = app;
