const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.get('/buscar', reservaController.buscarDisponibles);
router.post('/', reservaController.crearReserva);

module.exports = router;

router.get('/', reservaController.listarReservasFiltradas);