const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('transaccion', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        emisor: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        receptor:{
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        cantidad: {
            allowNull: false,
            type: DataTypes.FLOAT,
            unique:false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    });
}