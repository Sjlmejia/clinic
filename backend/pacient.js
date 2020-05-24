const mongoose = require('mongoose');
const pacientSchema = new mongoose.Schema(
  
  {
    drugName: {type: String, required: true},
    drugType: {type: String, required: true},
    mechanismOfAction: {type: String, required: true},
    indicationsOrSpectrum: {type: String, required: true},
    adults: {type: String, required: true},
    children: {type: String, required: true},
    elderly: {type: String, required: true},
    kidneyFailure: {type: String, required: true},
    liverFailure: {type: String, required: true},
    pregnancyAndLactation: {type: String, required: true},
    bioavailability: {type: String, required: true},
    maximumConcentration: {type: String, required: true},
    areaDownCurve: {type: String, required: true},
    halfLife: {type: String, required: true},
    proteinBinding: {type: String, required: true},
    volumeOfDistribution: {type: String, required: true},
    metabolism: {type: String, required: true},
    excretion: {type: String, required: true},
    disseminationCNS: {type: String, required: true},
    intracellularConcetracion: {type: String, required: true},
    fcRatio: {type: String, required: true},
    iterectaionDrugs: {type: String, required: true},
    sideEffects: {type: String, required: true},
    contraindications: {type: String, required: true},
    tradenames: {type: String, required: true},
    comments: {type: String, required: true},
    formsPharmaceuticals: {type: String, required: true}
  });

module.exports = mongoose.model('Pacient', pacientSchema);
