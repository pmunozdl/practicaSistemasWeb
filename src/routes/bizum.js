var express = require('express');
const { use } = require('./inicioUsuarioRegistrado');
var router = express.Router();
const { models } = require('../sequelize');
const sequelize = require('../sequelize');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('bizum', { title: 'Bizum',  user: req.session.user});
});

router.post('/', async function(req, res, next){
  let cifra = req.body.cantidad;
  let cantidad = Number(cifra); //cantidad transacción
  let receptor = req.body.receptor; //receptor
  let username = req.session.user.username;//emisor
  let receptor2 = await models.user.findOne({where: { username : receptor}});
  let user = await models.user.findOne({where: {username: username}});
  let saldo2 = receptor2.dataValues.saldo; //saldo receptor
  let saldo = user.dataValues.saldo; //saldo emisor
  //const user = await models.user.findOne({ where: { username } });  //agarrar name de input
  
  
  
  if (receptor2) { //si existe el receptor sigue. Si no, cancela operación
    if(saldo >= cantidad) {
      if (!isNaN(cantidad) && cantidad <= 50) {
        const nuevaTransacion = await newTransaccion(username, receptor, cantidad);
        user.update({saldo : saldo - cantidad}, {where: { user: user}});
        receptor2.update({saldo: saldo2 + cantidad}, {where: {username: receptor}});
        // res.json({bien:true}); poner como en el de conversor. 
      } else {
        req.session.error = "El valor introducido no es un número";
        res.redirect("/bizum");
      } 
    }else {
      req.session.error="No tiene suficiente dinero para realizar la operación.";
      res.redirect("/bizum");
    } 
  } else {
    req.session.error = "No existe ese nombre";
    res.redirect("/bizum");
  }
});

async function newTransaccion (emisor, receptor, cantidad){
  let fecha = new Date();
  let tipo = "Bizum";
  let Confirmado = true;
  const nuevaTransacion = await models.transaccion.create({emisor, receptor, cantidad, fecha, tipo, Confirmado});
  return nuevaTransacion;
}

module.exports = router;

