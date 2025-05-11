const { Sequelize } = require('sequelize');

// Cambiá estos valores por los de tu base de datos
const sequelize = new Sequelize('hotel_db', 'postgres', '212612', {
    host: 'localhost',
    dialect: 'postgres',
  logging: console.log, // Para ver las consultas en consola
});

module.exports = sequelize;
