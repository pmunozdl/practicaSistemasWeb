var express = require('express');
var router = express.Router();
const { models } = require('../sequelize');
const bcrypt = require("bcrypt");
const { Sequelize, Model } = require('sequelize'); //cargo la librería sequelize
//const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  let mensaje;
  res.render('registro', { title: 'Registro',mensaje, user: req.session.user }); // con este user luego lo llamo en el header. Declarar en todas las rutas que lleven header.
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
  if (!user) { //compruebo si existe el usuario o el teléfono (deben ser únicos).
    if (!phone) {
      if (pass.length >= 8 && pass === pass1) {
        if (regex.test(phoneNumber)) {
        const newUser = await registerUser(username, pass, phoneNumber);
        req.session.user = newUser;
        req.session.message = "Welcome!"
        res.redirect("/inicioUsuarioRegistrado");
        } else {
          let mensaje = "The phone number must be of the format 6ddddddd.";
          res.render('registro', { title: 'Registro',mensaje, user: req.session.user });
          //res.redirect("/registro");
        }
      } else{
          let mensaje = "La contraseña no es válida. Introduzca otra";
          res.render('registro', { title: 'Registro',mensaje, user: req.session.user });
          //res.redirect("/registro");
      }
    }else{
      let mensaje = "Ya existe ese número de teléfono";
      res.render('registro', { title: 'Registro',mensaje, user: req.session.user });
      //res.redirect("/registro");
    }
  } else {
    let mensaje= "Ya existe ese username";
    res.render('registro', { title: 'Registro',mensaje, user: req.session.user });
    //res.redirect("/registro");
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


// breve ejemplo de cómo sería con Array
// if (!database.users[user]) {
//   req.session.user = database.users[user]; //accedemos a la informacion del usuario si no existe
//   if (pass != pass1) {
//     req.session.error = "Passwords don't match";
//     res.redirect("/registro");
//   } else if (pass.length < 8 && pass1.length < 8) {
//     req.session.error = "Passwords need to be 8 characters long";
//     res.redirect("/registro");
//     // EXPRESIÓN REGULAR
//   }else if (!/^[A-Z]{1}[a-z0-9A-Z\._-]+$/.test(pass)){  //EXPRESION REGULAR
//     req.session.error = "formato incorrecto de contraseña: Primera letra Mayuscula, + 4 caracteres";
//     res.redirect("/registro");
//   } else if (pass === pass1) {
//     if(roles === "usuario") {
//       database.users.register(user, pass, "user", function() {
//         //console.log("rol:"+roles);
//         console.log("Se ha registrado con exito");
//         req.session.message = "You have just registered please enter new account to log in!";
//         res.redirect("/login");
//       });
//     }
//     } else {
//     database.users.register(user, pass,"admin",function () {
//       //console.log("rol:"+roles);
//       console.log("Se ha registrado con exito");
//       req.session.message = "You have just registered please enter new account to log in!";
//       res.redirect("/login");
//     });
//   }
// } else {
//   req.session.error = "User already exists";
//   res.redirect("/registro");
// }
// });
