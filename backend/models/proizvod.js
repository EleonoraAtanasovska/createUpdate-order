const mongoose = require('mongoose');

const proizvodSchema = new mongoose.Schema({
  nazivProizvoda: {type: String},
  jedinicaMere: {type: String},
  cena: {type: Number}
})

module.exports = mongoose.model('Proizvod', proizvodSchema)
