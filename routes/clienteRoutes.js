const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getClientes);
router.get('/:cedula', clienteController.getClientePorCedula);
router.post('/', clienteController.createCliente);

module.exports = router;
