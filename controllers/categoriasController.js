const db = require('../db/db');

const obtenerTodasLasCategorias = (req, res) => {
    const sql = 'SELECT * FROM categorias';
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener categorías');
        } else {
            res.json(results);
        }
    });
};

const obtenerCategoriaPorId = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM categorias WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener la categoría');
        } else {
            res.json(result);
        }
    });
};

const crearCategoria = (req, res) => {
    const { nombre } = req.body;
    const sql = 'INSERT INTO categorias (nombre) VALUES (?)';
    db.query(sql, [nombre], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al crear la categoría');
        } else {
            res.json({ message: 'Categoría creada', categoriaId: result.insertId });
        }
    });
};

const actualizarCategoria = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const sql = 'UPDATE categorias SET nombre = ? WHERE id = ?';
    db.query(sql, [nombre, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al actualizar la categoría');
        } else {
            res.json({ message: 'Categoría actualizada' });
        }
    });
};

const eliminarCategoria = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM categorias WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al eliminar la categoría');
        } else {
            res.json({ message: 'Categoría eliminada' });
        }
    });
};

module.exports = {
    obtenerTodasLasCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
