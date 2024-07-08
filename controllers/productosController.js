const db = require('../db/db');

const obtenerTodosLosProductos = (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener productos');
        } else {
            res.json(results);
        }
    });
};

const obtenerProductoPorId = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener el producto');
        } else {
            res.json(result);
        }
    });
};

const crearProducto = (req, res) => {
    const { nombre, precio, categoria_id, proveedor_id } = req.body;
    const sql = 'INSERT INTO productos (nombre, precio, categoria_id, proveedor_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, precio, categoria_id, proveedor_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al crear el producto');
        } else {
            res.json({ message: 'Producto creado', productoId: result.insertId });
        }
    });
};

const actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, categoria_id, proveedor_id } = req.body;
    const sql = 'UPDATE productos SET nombre = ?, precio = ?, categoria_id = ?, proveedor_id = ? WHERE id = ?';
    db.query(sql, [nombre, precio, categoria_id, proveedor_id, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al actualizar el producto');
        } else {
            res.json({ message: 'Producto actualizado' });
        }
    });
};

const eliminarProducto = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al eliminar el producto');
        } else {
            res.json({ message: 'Producto eliminado' });
        }
    });
};

module.exports = {
    obtenerTodosLosProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
