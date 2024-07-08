const db = require('../db/db');

const obtenerTodosLosProveedores = (req, res) => {
    const sql = 'SELECT * FROM proveedores';
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener proveedores');
        } else {
            res.json(results);
        }
    });
};

const obtenerProveedorPorId = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM proveedores WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener el proveedor');
        } else {
            res.json(result);
        }
    });
};

const crearProveedor = (req, res) => {
    const { nombre, contacto } = req.body;
    const sql = 'INSERT INTO proveedores (nombre, contacto) VALUES (?, ?)';
    db.query(sql, [nombre, contacto], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al crear el proveedor');
        } else {
            res.json({ message: 'Proveedor creado', proveedorId: result.insertId });
        }
    });
};

const actualizarProveedor = (req, res) => {
    const { id } = req.params;
    const { nombre, contacto } = req.body;
    const sql = 'UPDATE proveedores SET nombre = ?, contacto = ? WHERE id = ?';
    db.query(sql, [nombre, contacto, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al actualizar el proveedor');
        } else {
            res.json({ message: 'Proveedor actualizado' });
        }
    });
};

const eliminarProveedor = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM proveedores WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al eliminar el proveedor');
        } else {
            res.json({ message: 'Proveedor eliminado' });
        }
    });
};

module.exports = {
    obtenerTodosLosProveedores,
    obtenerProveedorPorId,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
};
