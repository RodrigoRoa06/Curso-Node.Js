
const express = require('express');
const productosRouter = require('../routes/productosRouter.js');
const categoriasRouter = require('../routes/categoriasRouter.js');
const proveedoresRouter = require('../routes/proveedoresRouter.js');

const app = express();
const PORT = 3001;

app.use(express.json());

// Rutas principales
app.use('/productos', productosRouter);
app.use('/categorias', categoriasRouter);
app.use('/proveedores', proveedoresRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
