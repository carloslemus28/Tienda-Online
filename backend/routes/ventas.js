const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/finalizar', async (req, res) => {
  const carrito = req.body.carrito;
  const fecha = new Date();
  let total = 0;

  try {
    // Calcular total
    for (const item of carrito) {
      const [prod] = await db.promise().query('SELECT precio FROM productos WHERE id = ?', [item.id]);
      total += prod[0].precio * item.cantidad;
    }

    // Registrar venta
    const [venta] = await db.promise().query('INSERT INTO venta (fecha, total) VALUES (?, ?)', [fecha, total]);
    const ventaId = venta.insertId;

    // Registrar detalles y actualiza stock
    for (const item of carrito) {
      const [prod] = await db.promise().query('SELECT precio, stock FROM productos WHERE id = ?', [item.id]);

      if (prod[0].stock < item.cantidad) {
        return res.status(400).json({ error: 'Stock insuficiente para un producto.' });
      }

      await db.promise().query('INSERT INTO venta_detalle (venta_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)', [
        ventaId,
        item.id,
        item.cantidad,
        prod[0].precio
      ]);

      const nuevoStock = prod[0].stock - item.cantidad;
      await db.promise().query('UPDATE productos SET stock = ? WHERE id = ?', [nuevoStock, item.id]);
    }

    res.json({ mensaje: 'Compra finalizada correctamente' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al finalizar la compra' });
  }
});

// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM venta ORDER BY fecha DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
});

// Obtener detalle de una venta
router.get('/:id', async (req, res) => {
  try {
    const ventaId = req.params.id;
    const [detalles] = await db.promise().query(`
      SELECT vd.cantidad, vd.precio_unitario, p.nombre
      FROM venta_detalle vd
      JOIN productos p ON vd.producto_id = p.id
      WHERE vd.venta_id = ?
    `, [ventaId]);
    res.json(detalles);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener detalle de venta' });
  }
});

module.exports = router;
