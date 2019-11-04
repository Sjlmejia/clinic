import mongoose = require('mongoose');
const attendSchema = new mongoose.Schema({
  idPacient: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: String, required: false},
});

export = mongoose.model('Attend', attendSchema);
