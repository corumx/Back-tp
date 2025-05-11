const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Hotel = sequelize.define('Hotel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Hotel;
