const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/', hotelController.getHoteles);
router.get('/:id', hotelController.getHotel);
router.post('/', hotelController.createHotel);
router.put('/:id', hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;
