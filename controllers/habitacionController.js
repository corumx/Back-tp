const Habitacion = require('../models/habitacion');
const Hotel = require('../models/hotel');

exports.getHabitaciones = async (req, res) => {
    const habitaciones = await Habitacion.findAll({ include: Hotel });
    res.json(habitaciones);
};

exports.getHabitacion = async (req, res) => {
    const habitacion = await Habitacion.findByPk(req.params.id, { include: Hotel });
    if (!habitacion) return res.status(404).send('Habitación no encontrada');
    res.json(habitacion);
};

exports.createHabitacion = async (req, res) => {
    const habitacion = await Habitacion.create(req.body);
    res.status(201).json(habitacion);
};

exports.updateHabitacion = async (req, res) => {
    const habitacion = await Habitacion.findByPk(req.params.id);
    if (!habitacion) return res.status(404).send('Habitación no encontrada');
    await habitacion.update(req.body);
    res.json(habitacion);
};

exports.deleteHabitacion = async (req, res) => {
    const habitacion = await Habitacion.findByPk(req.params.id);
    if (!habitacion) return res.status(404).send('Habitación no encontrada');
    await habitacion.destroy();
    res.sendStatus(204);
};


//Crear endpoint para obtener habitaciones por hotel
exports.getMapaPorHotel = async (req, res) => {
        const { hotelId } = req.params;
    
        const habitaciones = await Habitacion.findAll({
        where: { hotelId },
        order: [
            ['piso', 'ASC'],
            ['posicionY', 'ASC'],
            ['posicionX', 'ASC']
        ]
        });
    
        // Agrupar por piso
        const mapa = {};
    
        habitaciones.forEach(habitacion => {
        const piso = habitacion.piso;
        if (!mapa[piso]) mapa[piso] = [];
        mapa[piso].push(habitacion);
        });
    
        res.json(mapa);
    };
    