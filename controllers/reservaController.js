const Reserva = require('../models/reserva');
const Habitacion = require('../models/habitacion');
const Cliente = require('../models/Cliente');
const Hotel = require('../models/hotel');
const { Op } = require('sequelize');

// Buscar habitaciones disponibles
exports.buscarDisponibles = async (req, res) => {
    const { fechaIngreso, fechaSalida, capacidad } = req.query;

    if (!fechaIngreso || !fechaSalida) {
        return res.status(400).json({ error: 'Debe ingresar fecha de ingreso y salida' });
    }

    // Buscar habitaciones que NO tengan reservas en ese rango
    const habitacionesOcupadas = await Reserva.findAll({
        where: {
        [Op.or]: [
            {
            fechaIngreso: {
                [Op.between]: [fechaIngreso, fechaSalida]
            }
            },
            {
            fechaSalida: {
                [Op.between]: [fechaIngreso, fechaSalida]
            }
            },
            {
            fechaIngreso: {
                [Op.lte]: fechaIngreso
            },
            fechaSalida: {
                [Op.gte]: fechaSalida
            }
            }
        ]
        }
    });

    const habitacionesOcupadasIds = habitacionesOcupadas.map(r => r.habitacionId);

    const whereHabitacion = {};
    if (capacidad) {
        whereHabitacion.capacidad = { [Op.gte]: capacidad };
    }

    const disponibles = await Habitacion.findAll({
        where: {
        id: { [Op.notIn]: habitacionesOcupadasIds },
        ...whereHabitacion
        },
        include: [Hotel]
    });

    res.json(disponibles);
};

// Crear reserva
exports.crearReserva = async (req, res) => {
    const { fechaIngreso, fechaSalida, cantidadPersonas, cedula, habitacionId } = req.body;

    if (!fechaIngreso || !fechaSalida || !cedula || !habitacionId) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Obtener o crear cliente
    let cliente = await Cliente.findOne({ where: { cedula } });
    if (!cliente) {
        const { nombre, apellido } = req.body;
        if (!nombre || !apellido) return res.status(400).json({ error: 'Nuevo cliente: nombre y apellido requeridos' });
        cliente = await Cliente.create({ cedula, nombre, apellido });
    }

    // Obtener habitación
    const habitacion = await Habitacion.findByPk(habitacionId);
    if (!habitacion) return res.status(404).json({ error: 'Habitación no encontrada' });

    // Verificar disponibilidad
    const reservas = await Reserva.findAll({
        where: {
        habitacionId: habitacionId,
        [Op.or]: [
            {
            fechaIngreso: { [Op.between]: [fechaIngreso, fechaSalida] }
            },
            {
            fechaSalida: { [Op.between]: [fechaIngreso, fechaSalida] }
            },
            {
            fechaIngreso: { [Op.lte]: fechaIngreso },
            fechaSalida: { [Op.gte]: fechaSalida }
            }
        ]
        }
    });

    if (reservas.length > 0) return res.status(400).json({ error: 'Habitación no disponible en ese rango de fechas' });

    // Crear reserva
    const reserva = await Reserva.create({
        fechaIngreso,
        fechaSalida,
        cantidadPersonas,
        clienteId: cliente.id,
        habitacionId,
        hotelId: habitacion.hotelId
    });

    res.status(201).json(reserva);
};


//para el punto 5

exports.listarReservasFiltradas = async (req, res) => {
    const { hotelId, fechaIngreso, fechaSalida, clienteId } = req.query;

    if (!hotelId || !fechaIngreso) {
        return res.status(400).json({ error: 'hotelId y fechaIngreso son obligatorios' });
    }

    const filtros = {
        hotelId,
        fechaIngreso: {
        [Op.gte]: fechaIngreso
        }
    };

    if (fechaSalida) {
        filtros.fechaSalida = {
        [Op.lte]: fechaSalida
        };
    }

    if (clienteId) {
        filtros.clienteId = clienteId;
    }

    const reservas = await Reserva.findAll({
        where: filtros,
        include: [
        { model: Hotel },
        { model: Habitacion },
        { model: Cliente }
        ],
        order: [
        ['fechaIngreso', 'ASC'],
        [Habitacion, 'piso', 'ASC'],
        [Habitacion, 'numero', 'ASC']
        ]
    });

    res.json(reservas);
};
