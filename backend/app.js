const express = require('express');

const mongoose = require('mongoose');

const Narudjbenica = require("./models/narudjbenica")

const Proizvod = require("./models/proizvod")



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use((req,res,next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS, PUSH ");
  next();
});

mongoose.connect('mongodb://localhost/fpis1').then(()=> {
  console.log('Connected to database')
})
.catch(()=> {
  console.log('Connection failed');
});

app.get("/api/narudjbenica/:idNarudjbenice", (req,res,next) =>{
  Narudjbenica.findOne({ _id:req.params.idNarudjbenice}).then(narudjbenica => {
    if (!narudjbenica){
      res.status(404).json({
        error:{
          message: 'Ne postoi narudjbenica sa id '+req.params.idNarudjbenice
        }
      })
      return
    }else{
    res.status(200).json({
      narudjbenica: narudjbenica
    })}
  }).catch((error) =>{
    res.status(500).send(error)
  })
});

app.post("/api/narudjbenice", (req, res, next) =>{
    const narudjbenica = new Narudjbenica({
    _id: req.body._id,
    datumKreiranja: req.body.datumKreiranja,
    napomena: req.body.napomena,
    stavki: req.body.stavki
  });
  narudjbenica.save(narudjbenica).then((result)=>{
    res.send(result)
  }, (error) => {
    if (error.code === 11000){
      res.status(400).json({
      error:{
        message: "Postoi narudjbenica sa uneseni id"
      }
    })
    }
    res.status(400).json({
      error:{
        message: "Narudjbenica ne moze biti zacuvana"
      }
    })
  });

})

app.put("/api/narudjbenice/:id",  (req, res, next) => {
  const narudjbenica = new Narudjbenica({
    _id: req.body._id,
    datumKreiranja: req.body.datumKreiranja,
    napomena: req.body.napomena,
    stavki: req.body.stavki
  });
  Narudjbenica.updateOne({_id: req.params.id}, narudjbenica).then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Narudjbenica sa id ' +req.params.id+ ' je uspesno izmenjena'
    });
  })
  .catch((error) =>{
    res.status(400).send(error);
  });
})


app.delete("/api/izbrisinarudjbenica/:id", (req,res, next) =>{
  Narudjbenica.deleteOne({_id: req.params.id}).then(result =>{
    res.send(result)
  },(error) => {
    res.status(400).json({
      error:{
        message: "Narudjbenica ne moze biti izbrisana"
      }
    })
  })
});

app.get("/api/proizvod", (req, res, next) =>{
  Proizvod.find().then(documents => {
    res.status(200).json({
      proizvode : documents
    });
  }).catch((error) =>{
    res.status(400).send(error);
  });
});



module.exports = app;
