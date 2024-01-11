var express = require('express');
var router = express.Router();
const { models } = require('../sequelize');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// let cantidadEl_two;
// console.log(cantidadEl_two+"aaaa");
/* GET home page. */
router.get('/', async function(req, res, next) {
  let usuarios = await models.user.findAll({where: {rol:"user"}});
  // let cantidadEl_two;
  // console.log(cantidadEl_two);
  let mensaje;
  res.render('cambioSaldo', { title: 'Cambio Saldo', usuarios,mensaje, user: req.session.user,cantidadEl_two:0 });
});
router.post('/', async function(req, res, next){
  saldo = req.session.user.saldo;
  const monedaEl_one = req.body.moneda1;
  const monedaEl_two = req.body.moneda2;
  const cantidadEl_one = req.body.cantidad1;
  if (!isNaN(cantidadEl_one)) {
    if (cantidadEl_one <= saldo) {
      // const temp = monedaEl_one;
      // monedaEl_one = monedaEl_two;
      // monedaEl_two = temp;
      fetch(`https://api.exchangerate-api.com/v4/latest/${monedaEl_one}`)
        .then(res => res.json())
        .then(data => {
            const taza = data.rates[monedaEl_two];
            cantidadEl_two = (cantidadEl_one * taza).toFixed(2);
            let mensaje;
            res.render('cambioSaldo', { title: 'Cambio Saldo',mensaje,user: req.session.user,cantidadEl_two });
          });
    } else {
      let mensaje = "No dispones de ese dinero";
      let cantidadEl_two;
      res.render('cambioSaldo', { title: 'Cambio Saldo',mensaje,user: req.session.user,cantidadEl_two });
      }
  } else {
    let mensaje = "La cantidad introducida no es un número";
    let cantidadEl_two;
    res.render('cambioSaldo', { title: 'Cambio Saldo',mensaje,user: req.session.user,cantidadEl_two });
  }
  } );


module.exports = router;
