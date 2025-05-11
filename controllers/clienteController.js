const Cliente = require('../models/Cliente');

exports.getClientes = async (req, res) => {
    const clientes = await Cliente.findAll();
    res.json(clientes);
};

exports.getClientePorCedula = async (req, res) => {
    const cliente = await Cliente.findOne({ where: { cedula: req.params.cedula } });
    if (!cliente) return res.status(404).send('Cliente no encontrado');
    res.json(cliente);
};

exports.createCliente = async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.status(201).json(cliente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
