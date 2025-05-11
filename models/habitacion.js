const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Hotel = require('./hotel');

const Habitacion = sequelize.define('Habitacion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numero: { type: DataTypes.STRING, allowNull: false },
    posicionX: { type: DataTypes.INTEGER },
    posicionY: { type: DataTypes.INTEGER },
    piso: { type: DataTypes.STRING },
    capacidad: { type: DataTypes.INTEGER },
    caracteristicas: { type: DataTypes.TEXT }
});

Hotel.hasMany(Habitacion, { foreignKey: 'hotelId', onDelete: 'CASCADE' });
Habitacion.belongsTo(Hotel, { foreignKey: 'hotelId' });

module.exports = Habitacion;
