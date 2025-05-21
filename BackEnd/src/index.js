const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const limiter = rateLimit({
    windowMs:  1 * 60 * 1000,
    max: 20, 
    message: 'Demasiadas peticiones desde esta IP, por favor intente de nuevo mas tarde.'
});

const app = express();
app.use(limiter);
app.use(cors());
app.use(express.json({limit: '100kb' }));

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
    console.error("Error no controlado:", err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend ON! ${PORT}`));