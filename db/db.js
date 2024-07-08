const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'supermercado_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexion con el servidor:', err);
        return;
    }

    console.log('Estado de conexión: CONECTADA.');

    const sqlCreateDB = 'CREATE DATABASE IF NOT EXISTS supermercado_db';
    connection.query(sqlCreateDB, (err) => {
        if (err) {
            console.error('Error al crear la base de datos:', err);
            return;
        }
        console.log('Base de datos: EXISTENTE/GARANTIZADA');

        connection.changeUser({ database: 'supermercado_db' }, (err) => {
            if (err) {
                console.error('Error al cambiar a la base de datos supermercado_db:', err);
                return;
            }

            const createCategoriasTable = `
                CREATE TABLE IF NOT EXISTS categorias (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL
                );
            `;

            const createProductosTable = `
                CREATE TABLE IF NOT EXISTS productos (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    precio DECIMAL(10, 2) NOT NULL,
                    categoria_id INT,
                    proveedor_id INT,
                    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
                    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
                );
            `;

            const createProveedoresTable = `
                CREATE TABLE IF NOT EXISTS proveedores (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    contacto VARCHAR(255) NOT NULL
                );
            `;

            connection.query(createCategoriasTable, (err) => {
                if (err) {
                    console.error('Error al crear la tabla de categorias:', err);
                    return;
                }
                console.log('Tabla categorias: EXISTENTE/GARANTIZADA');
            });

            connection.query(createProveedoresTable, (err) => {
                if (err) {
                    console.error('Error al crear la tabla de proveedores:', err);
                    return;
                }
                console.log('Tabla proveedores: EXISTENTE/GARANTIZADA');
            });

            connection.query(createProductosTable, (err) => {
                if (err) {
                    console.error('Error al crear la tabla de productos:', err);
                    return;
                }
                console.log('Tabla productos: EXISTENTE/GARANTIZADA');
            });
        });
    });
});

module.exports = connection;
