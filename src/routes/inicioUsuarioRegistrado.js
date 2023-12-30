var express = require('express');
var router = express.Router();
const { models } = require('../sequelize');
const { Sequelize, Model, NUMBER, FLOAT } = require('sequelize');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('inicioUsuarioRegistrado', { title: 'Bienvenido Usuario Registrado', user: req.session.user });
});

router.post('/', async function(req, res, next){
  let cifra = req.body.cantidad;
  let username = req.session.user.username;;
  const user = await models.user.findOne({ where: { username } });  //agarrar name de input
  let operacion = req.body.operacion;
  
  let cantidad = Number(cifra);
  if (user) {
    let saldo = user.dataValues.saldo;
    if (!isNaN(cantidad)) {
      if (operacion === "añadir") {
        user.update({saldo : saldo + cantidad}, {where: { user: user}});
        res.redirect("/inicioUsuarioRegistrado");
      }else{
        if (cantidad > saldo) {
          req.session.error = "No tienes suficiente dinero";
          res.redirect("/inicioUsuarioRegistrado");
        } else {
        user.update({saldo : saldo - cantidad}, {where: { user: user}});
        res.redirect("/inicioUsuarioRegistrado");
        }
      }
    } else {
      req.session.error = "El valor introducido no es un número";
      res.redirect("/inicioUsuarioRegistrado");
    }
  } else {
    req.session.error = "No existe ese nombre";
    res.redirect("/inicioUsuarioRegistrado");
  }
});


// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'sequelize/db.sqlite',
//   logging: true
// });

// const modelDefiners = [
//   require('../sequelize/models/user.model'),
//   // El resto de modelos
// ];

// for (const modelDefiner of modelDefiners){
//   modelDefiner(sequelize);
// }

module.exports = router;
