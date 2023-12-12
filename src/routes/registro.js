var express = require('express');
var router = express.Router();
const { models } = require('../sequelize');
const bcrypt = require("bcrypt");
const { Sequelize } = require('sequelize'); //cargo la librería sequelize

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

  const newUser = await registerUser(username, pass, phoneNumber);
  req.session.user = newUser;
  req.session.message = "Welcome!"
  res.redirect("/inicioUsuarioRegistrado");
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
async function defId () {
  let count = await sequelize.models.user.count();
  return count + 1;
  
}
async function registerUser(username, pass, phoneNumber){
  const password = await bcrypt.hash(pass, 10);
  const rol = await defRol(username);
  const id = await defId();
  let last_login = new Date();
  const newUser = await models.user.create({id, username, password, phoneNumber, rol, last_login});
  return newUser;
}

// if (!database.users[user]) {
//   req.session.user = database.users[user]; //accedemos a la informacion del usuario si no existe
//   if (pass != pass1) {
//     req.session.error = "Passwords don't match";
//     res.redirect("/registro");
//   } else if (pass.length < 5 && pass1.length < 5) {
//     req.session.error = "Passwords need to be 5 characters long";
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
//     } 
// } else {
//   req.session.error = "User already exists";
//   res.redirect("/registro");
// }

module.exports = router;
