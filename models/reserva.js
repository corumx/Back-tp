const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Hotel = require('./hotel');
const Habitacion = require('./habitacion');
const Cliente = require('./Cliente');

const Reserva = sequelize.define('Reserva', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fechaIngreso: { type: DataTypes.DATEONLY, allowNull: false },
    fechaSalida: { type: DataTypes.DATEONLY, allowNull: false },
    cantidadPersonas: { type: DataTypes.INTEGER, allowNull: false }
});

// Relaciones
Hotel.hasMany(Reserva, { foreignKey: 'hotelId' });
Reserva.belongsTo(Hotel, { foreignKey: 'hotelId' });

Habitacion.hasMany(Reserva, { foreignKey: 'habitacionId' });
Reserva.belongsTo(Habitacion, { foreignKey: 'habitacionId' });

Cliente.hasMany(Reserva, { foreignKey: 'clienteId' });
Reserva.belongsTo(Cliente, { foreignKey: 'clienteId' });

module.exports = Reserva;
