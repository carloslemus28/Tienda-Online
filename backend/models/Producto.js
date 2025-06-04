const db = require('../config/db');

const Producto = {
  obtenerTodos: (callback) => {
    db.query('SELECT * FROM productos', callback);
  },

  obtenerPorId: (id, callback) => {
    db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
  },

  crear: (producto, callback) => {
    const { nombre, descripcion, imagen, precio, stock } = producto;
    const sql = 'INSERT INTO productos (nombre, descripcion, imagen, precio, stock) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, descripcion, imagen, precio, stock], callback);
  },

  actualizar: (id, producto, callback) => {
    const { nombre, descripcion, imagen, precio, stock } = producto;
    const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, imagen = ?, precio = ?, stock = ? WHERE id = ?';
    db.query(sql, [nombre, descripcion, imagen, precio, stock, id], callback);
  },

  eliminar: (id, callback) => {
    db.query('DELETE FROM productos WHERE id = ?', [id], callback);
  }
};

module.exports = Producto;
