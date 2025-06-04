const db = require('../config/db');

const Usuario = {
  crear: (datos, callback) => {
    const { nombre, apellido, correo, contrasena } = datos;
    const sql = 'INSERT INTO usuarios (nombre, apellido, correo, contrasena) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, correo, contrasena], callback);
  },

  buscarPorCorreo: (correo, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(sql, [correo], callback);
  }
};
module.exports = Usuario;
