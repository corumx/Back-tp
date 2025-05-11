const Hotel = require('../models/hotel');

exports.getHoteles = async (req, res) => {
    const hoteles = await Hotel.findAll();
    res.json(hoteles);
};

exports.getHotel = async (req, res) => {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).send('Hotel no encontrado');
    res.json(hotel);
};

exports.createHotel = async (req, res) => {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
};

exports.updateHotel = async (req, res) => {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).send('Hotel no encontrado');
    await hotel.update(req.body);
    res.json(hotel);
};

exports.deleteHotel = async (req, res) => {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).send('Hotel no encontrado');
    await hotel.destroy();
    res.sendStatus(204);
};
