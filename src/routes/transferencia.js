var express = require('express');
var router = express.Router();
const { models } = require('../sequelize');
const sequelize = require('../sequelize');
/* GET home page. */
router.get('/', async function(req, res, next) {
  let mensaje;
  const username = req.session.user.username;
  let user = await models.user.findOne({where: {username: username}});
  res.render('transferencia', { title: 'Transferencia', user: req.session.user, mensaje});
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
    if (!isNaN(cantidad)) {
      if(saldo >= cantidad) {
        const nuevaTransacion = await newTransaccion(username, receptor, cantidad);
        user.update({saldo : saldo - cantidad}, {where: { user: user}});
        let mensaje = "Operación realizada con éxito"
        res.render('transferencia', { title: 'Transferencia',  user, mensaje});
        // receptor2.update({saldo: saldo2 + cantidad}, {where: {username: receptor}});
      } else {
        req.session.error="No tiene suficiente dinero para realizar la operación.";
        let mensaje = "No tiene suficiente dinero para realizar la operación."
        res.render('transferencia', { title: 'Transferencia',  user, mensaje});
      } 
    }else {
      req.session.error = "La cantidad introducida no es válida.";
      let mensaje = "La cantidad introducida no es válida."
      res.render('transferencia', { title: 'Transferencia',  user, mensaje});
    } 
  } else {
    req.session.error = "No existe ese usuario";
    let mensaje = "No existe ese usuario"
    res.render('transferencia', { title: 'Transferencia',  user, mensaje});
  }
});

async function newTransaccion (emisor, receptor, cantidad){
  let fecha = new Date();
  let tipo = "Transferencia";
  let Confirmado = false;
  const nuevaTransacion = await models.transaccion.create({emisor, receptor, cantidad, fecha, tipo, Confirmado});
  return nuevaTransacion;
}


module.exports = router;