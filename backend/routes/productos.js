const express = require('express');
const router = express.Router();
const db = require('../config/db');

const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productosController');

router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;
router.put('/:id/stock', (req, res) => {
  const id = req.params.id;
  const nuevaCantidad = req.body.stock;
  const sql = 'UPDATE productos SET stock = ? WHERE id = ?';
  db.query(sql, [nuevaCantidad, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar stock' });
    res.json({ mensaje: 'Stock actualizado correctamente' });
  });
});
