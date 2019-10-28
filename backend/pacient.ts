import mongoose = require('mongoose');
const pacientSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  heightPacient: {type: String, required: false},
  weightPacient: {type: String, required: false},
  bloodType: {type: String, required: false},
  sexType: {type: String, required: false},
  dni: {type: String, required: false},
  date: {type: String, required: false},
  imagePath: {type: String, required: false}
});

export = mongoose.model('Pacient', pacientSchema);
