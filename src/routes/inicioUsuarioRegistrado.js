var express = require('express');
var router = express.Router();
const { models } = require('../sequelize');
const { Sequelize, Model, NUMBER, FLOAT } = require('sequelize');
const { Op } = Sequelize;
/* GET home page. */
router.get('/', async function(req, res, next) {
  let username = req.session.user.username;
  let usuarios = await models.user.findAll({where: {rol:"user"}});
  let transacciones = await models.transaccion.findAll({where: {Confirmado:true,[Op.or]:[{emisor:username}, {receptor:username}]}});
  let mensaje;
  const user = await models.user.findOne({ where: { username } });
  res.render('inicioUsuarioRegistrado', { title: 'Bienvenido Usuario Registrado',usuarios,mensaje, transacciones,user});
});

router.post('/', async function(req, res, next){
  let cifra = req.body.cantidad;
  let username = req.session.user.username;;
  const user = await models.user.findOne({ where: { username } });  //agarrar name de input
  let operacion = req.body.operacion;
  
  let cantidad = Number(cifra);
  if (user) {
    let username = req.session.user.username;
    let usuarios = await models.user.findAll({where: {rol:"user"}});
    let transacciones = await models.transaccion.findAll({where: {Confirmado:true,[Op.or]:[{emisor:username}, {receptor:username}]}});
    let saldo = user.dataValues.saldo;
    if (!isNaN(cantidad)) {
      if (operacion === "añadir") {
        user.update({saldo : saldo + cantidad}, {where: { user: user}});
        let mensaje = "Dinero añadido correctamente"
        res.render('inicioUsuarioRegistrado', { title: 'Bienvenido Usuario Registrado',usuarios,mensaje, transacciones,user });
      }else{
        if (cantidad > saldo) {
          let mensaje = "No tienes suficiente dinero";
          res.render('inicioUsuarioRegistrado', { title: 'Bienvenido Usuario Registrado',usuarios,mensaje, transacciones,user});

        } else {
        user.update({saldo : saldo - cantidad}, {where: { user: user}});
        let mensaje = "Dinero retirado correctamente";
        res.render('inicioUsuarioRegistrado', { title: 'Bienvenido Usuario Registrado',usuarios,mensaje, transacciones,user });
        }
      }
    } else {
      let mensaje = "El valor introducido no es un número";
      res.render('inicioUsuarioRegistrado', { title: 'Bienvenido Usuario Registrado',usuarios,mensaje, transacciones,user});
    }
  } else {
    let mensaje = "No existe ese nombre";
    res.render('inicioUsuarioRegistrado', { title: 'Bienvenido Usuario Registrado',usuarios,mensaje, transacciones,user});
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
