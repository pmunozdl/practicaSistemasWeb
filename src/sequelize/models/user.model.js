const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /^\w{3,}$/
            }
        },
        password:{
            allowNull: false,
            type: DataTypes.STRING,
            unique: false
        },
        phoneNumber: {
            // allowNull: false,
            type: DataTypes.STRING,
            unique:true
        },
        saldo: {
            type: DataTypes.FLOAT,
            unique: false,
            allowNull: false,
            defaultValue: 0
        },
        rol: {
            type: DataTypes.ENUM("admin", "user"),
            allowNull: true
        },
        last_login: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
    //TO DO: añadir parámetros como last login, saldo...
}