const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const registrar = (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;

  bcrypt.hash(contrasena, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Error al encriptar contraseña' });

    Usuario.crear({ nombre, apellido, correo, contrasena: hash }, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al registrar usuario' });
      res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    });
  });
};

const login = (req, res) => {
  const { correo, contrasena } = req.body;

  Usuario.buscarPorCorreo(correo, (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const usuario = results[0];

    bcrypt.compare(contrasena, usuario.contrasena, (err, esValido) => {
      if (!esValido) return res.status(401).json({ error: 'Contraseña incorrecta' });

      const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      res.json({
        mensaje: 'Inicio de sesión exitoso',
        token,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo
        }
      });
    });
  });
};

module.exports = { registrar, login };
