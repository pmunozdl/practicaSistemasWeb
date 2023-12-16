const { Sequelize, TIME } = require('sequelize'); //cargo la librería sequelize
const bcrypt = require('bcrypt');

function generateRandomNineDigitNumber() {
    let randomNumber = "";
    for (let i = 0; i < 8; i++) {
      randomNumber += Math.floor(Math.random() * 8);
      numero = "6" + randomNumber;
    }
    return numero;
  }

function generateTypeTransaccion() {
    tipo = ["Bizum", "Transferencia"];
    resultado = tipo[Math.floor(Math.random()*2)];
    console.log(resultado);
    return resultado;
}
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sequelize/db.sqlite',
    logging: true
});

const modelDefiners = [
    require('./models/user.model'),
    require('./models/transaccion.model')
];

for (const modelDefiner of modelDefiners){
    modelDefiner(sequelize);
}

async function resetUser(){
    await sequelize.sync({force: true}); // false para que no se reinice la DB
    const count = await sequelize.models.user.count();
    const users = [
        {username: 'user'},
        {username: 'admin'},
    ];
    if (count == 0){
        for (let index = 0; index < users.length; index++){
            users[index].password = await bcrypt.hash(users[index].username, 10);
            users[index].phoneNumber = await generateRandomNineDigitNumber();
            // users[index].id = await index +1;
            if (users[index].username == "admin") {
                users[index].rol = "admin";
            } else {
                users[index].rol = "user";
            }
        }
        await sequelize.models.user.bulkCreate(users);
        }
    }

async function resetTransaccion(){
    await sequelize.sync({force: true}); // false para que no se reinice la DB
    const count = await sequelize.models.transaccion.count();
    const transacciones = [
        {emisor: 'prueba'},
    ];
    if (count == 0){
        for (let index = 0; index < transacciones.length; index++){
            transacciones[index].receptor = "prueba";
            transacciones[index].cantidad = 0;
            // users[index].id = await index +1;
            transacciones[index].fecha = new Date();
            if (parseInt(transacciones[index].cantidad) > 50) {
                transacciones[index].tipo = "transacción";
            } else {
                transacciones[index].tipo = generateTypeTransaccion();
            }
        }
    await sequelize.models.transaccion.bulkCreate(transacciones);
        }
    }
resetUser();
resetTransaccion();

module.exports = sequelize;