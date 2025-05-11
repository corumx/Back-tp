const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
//rutas
const hotelRoutes = require('./routes/hotelRoutes');
const Hotel = require('./models/hotel'); // Aquí importas el modelo
const habitacionRoutes = require('./routes/habitacionRoutes');
const habitacion = require('./models/habitacion'); // importante importar para sync
const clienteRoutes = require('./routes/clienteRoutes');
const Cliente = require('./models/Cliente');
const reservaRoutes = require('./routes/reservaRoutes');
const Reserva = require('./models/reserva');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Probar conexión a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa.'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));
// Sincronizar DB
sequelize.sync({ alter: true }) // crea tablas si no existen
    .then(() => console.log(' Modelos sincronizados'));

app.use('/api/hoteles', hotelRoutes);
app.use('/api/habitaciones', habitacionRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/reservas', reservaRoutes);


// Ruta básica de prueba
app.get('/', (req, res) => {
    res.send('API funcionando');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
