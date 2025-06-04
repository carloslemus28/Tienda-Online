const Producto = require('../models/Producto');

const obtenerProductos = (req, res) => {
  Producto.obtenerTodos((err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener productos' });
    res.json(results);
  });
};

const obtenerProducto = (req, res) => {
  const id = req.params.id;
  Producto.obtenerPorId(id, (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(result[0]);
  });
};

const crearProducto = (req, res) => {
  Producto.crear(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear producto' });
    res.status(201).json({ mensaje: 'Producto creado exitosamente' });
  });
};

const actualizarProducto = (req, res) => {
  const id = req.params.id;
  Producto.actualizar(id, req.body, (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar producto' });
    res.json({ mensaje: 'Producto actualizado correctamente' });
  });
};

const eliminarProducto = (req, res) => {
  const id = req.params.id;
  Producto.eliminar(id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar producto' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  });
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
