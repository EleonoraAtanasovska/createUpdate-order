const mongoose = require('mongoose');
const Proizvod = require('./proizvod')

const  stavkeNarudjbeniceSchema = new mongoose.Schema({
  _id: false,
  idStavke: String,
  proizvod: {
    nazivProizvoda: String,
    jedinicaMere: String,
    cena: Number,
  },
  kolicina: {type: Number},
  napomenaStavke: {type: String}
})
const narudjbenicaSchema = new mongoose.Schema({
  _id: {type:String},
  datumKreiranja:  Date,
  napomena:  String,
  stavki: [stavkeNarudjbeniceSchema],
  status: {type: String},
  datumPotvrde: {type:Date}
})

module.exports = mongoose.model('Narudjbenica', narudjbenicaSchema);



