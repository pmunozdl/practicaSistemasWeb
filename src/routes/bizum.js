var express = require('express');
const { use } = require('./inicioUsuarioRegistrado');
var router = express.Router();
const { models } = require('../sequelize');
const sequelize = require('../sequelize');

/* GET home page. */
router.get('/', function(req, res, next) {
  let mensaje;
  res.render('bizum', { title: 'Bizum',  user: req.session.user, mensaje});
});

router.post('/', async function(req, res, next){
  let cifra = req.body.cantidad;
  let cantidad = Number(cifra); //cantidad transacción
  let receptor = req.body.receptor; //receptor
  let username = req.session.user.username;//emisor
  let receptor2 = await models.user.findOne({where: { username : receptor}});
  let user = await models.user.findOne({where: {username: username}});
  let saldo = user.dataValues.saldo; //saldo emisor
  //const user = await models.user.findOne({ where: { username } });  //agarrar name de input
  
  
  
  if (receptor2) { //si existe el receptor sigue. Si no, cancela operación
    let saldo2 = receptor2.dataValues.saldo; //saldo receptor
    if (!isNaN(cantidad) && cantidad <= 50) {
      if(saldo >= cantidad) {
        const nuevaTransacion = await newTransaccion(username, receptor, cantidad);
        user.update({saldo : saldo - cantidad}, {where: { user: user}});
        receptor2.update({saldo: saldo2 + cantidad}, {where: {username: receptor}});
        let mensaje = "Operación realizada con éxito";
        res.render('bizum', { title: 'Bizum',  user: req.session.user, mensaje});
      } else {
        req.session.error="No tiene suficiente dinero para realizar la operación.";
        let mensaje = "No tienes suficiente dinero";
        res.render('bizum', { title: 'Bizum',  user: req.session.user, mensaje});
      } 
    }else {
      req.session.error = "El valor introducido no es un número";
      let mensaje = "El valor introducido no es un número, o supera los 50$";
      res.render('bizum', { title: 'Bizum',  user: req.session.user, mensaje});
    } 
  } else if(!receptor2){
    req.session.error = "No existe ese nombre";
    let mensaje = "El usuario introducido no existe";
    res.render('bizum', { title: 'Bizum',  user: req.session.user, mensaje});
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

