const { Sequelize } = require('sequelize'); //cargo la librería sequelize
const bcrypt = require('bcrypt');

function generateRandomNineDigitNumber() {
    let randomNumber = "";
    for (let i = 0; i < 8; i++) {
      randomNumber += Math.floor(Math.random() * 8);
      numero = "6" + randomNumber;
    }
    return numero;
  }

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sequelize/db.sqlite',
    logging: true
});

const modelDefiners = [
    require('./models/user.model')
    // El resto de modelos
];

for (const modelDefiner of modelDefiners){
    modelDefiner(sequelize);
}

async function reset(){
    await sequelize.sync({force: false}); // false para que no se reinice la DB
    const count = await sequelize.models.user.count();
    const users = [
        {username: 'user'},
        {username: 'admin'},
    ];
    if (count == 0){
        for (let index = 0; index < users.length; index++){
            users[index].password = await bcrypt.hash(users[index].username, 10);
            users[index].phoneNumber = await generateRandomNineDigitNumber();
        }
        await sequelize.models.user.bulkCreate(users);
        }
    }
reset();

module.exports = sequelize;