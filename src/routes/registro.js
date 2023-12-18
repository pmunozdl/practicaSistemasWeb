var express = require('express');
var router = express.Router();
const { models } = require('../sequelize');
const bcrypt = require("bcrypt");
const { Sequelize, Model } = require('sequelize'); //cargo la librería sequelize

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Registro', user: req.session.user });
});

router.post('/', async function(req, res, next){
  // console.log("hola");
  // console.log(req.session.user); //No hace falta. Usar a modo de debugger.
  let username = req.body.username;
  let pass = req.body.password; //agarrar name de input
  let pass1 = req.body.password1;
  let phoneNumber = req.body.phoneNumber;
  let user = await sequelize.models.user.findOne({where: {username}});
  let phone = await sequelize.models.user.findOne({where: {phoneNumber}});
  const regex = /^6\d{8}$/; //empieza por 6, y tiene 9 dígitos.
  if (!user) { //compruebo si existe el usuario o el teléfono (deben ser únicos)
    if (!phone) {
      if (pass.length >= 8 && pass === pass1) {
        if (regex.test(phoneNumber)) {
        const newUser = await registerUser(username, pass, phoneNumber);
        req.session.user = newUser;
        req.session.message = "Welcome!"
        res.redirect("/inicioUsuarioRegistrado");
        } else {
          req.session.error = "The phone number must be of the format 6ddddddd.";
          res.redirect("/registro");
        }
      } else{
          req.session.error = "La contraseña no es válida. Introduzca otra";
          // alert("La contraseña no es válida");
          res.redirect("/registro");
      }
    }else{
      req.session.error = "Ya existe ese número de teléfono";
      // alert("Ya existe ese usuario");
      res.redirect("/registro");
    }
  } else {
    req.session.error = "Ya existe ese username";
    // alert("Ya existe ese usuario");
    res.redirect("/registro");
  }
});

async function defRol (username) {
  if (username  ==  "admin") {
    rol = "admin";
  } else {
    rol = "user";
  }
  return rol;
}
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sequelize/db.sqlite',
  logging: true
});

const modelDefiners = [
  require('../sequelize/models/user.model'),
  // El resto de modelos
];

for (const modelDefiner of modelDefiners){
  modelDefiner(sequelize);
}

async function registerUser(username, pass, phoneNumber){
  const password = await bcrypt.hash(pass, 10);
  const rol = await defRol(username);
  let last_login = new Date();
  const newUser = await models.user.create({username, password, phoneNumber, rol, last_login});
  return newUser;
}
module.exports = router;
