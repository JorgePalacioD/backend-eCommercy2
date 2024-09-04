const express = require('express');
const FacturaService = require('../../application/FacturasService');
const Factura = require('../../core/domain/Facturas');

const router = express.Router();

// Ruta para crear una nueva factura
router.post('/facturas', async (req, res) => {
  const { idoperador, numerofac, fecha, sede, anio, mes, cantidadkh, valor_factura, idusuario } = req.body;
  const factura = new Factura(null, idoperador, numerofac, fecha, sede, anio, mes, cantidadkh, valor_factura, idusuario);
  try {
    const result = await FacturaService.create(factura);
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Ruta para obtener todas las facturas
router.get('/facturas', async (req, res) => {
  try {
    const facturas = await FacturaService.getAll();
    res.json({ success: true, data: facturas });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Ruta para obtener una factura por ID
router.get('/facturas/:idfactura', async (req, res) => {
  const { idfactura } = req.params;
  try {
    const factura = await FacturaService.getById(idfactura);
    res.json({ success: true, data: factura });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Ruta para actualizar una factura
router.put('/facturas/:idfactura', async (req, res) => {
  const { idfactura } = req.params;
  const { idoperador, numerofac, fecha, sede, anio, mes, cantidadkh, valor_factura, idusuario } = req.body;
  const updatedFactura = new Factura(idfactura, idoperador, numerofac, fecha, sede, anio, mes, cantidadkh, valor_factura, idusuario);
  try {
    const result = await FacturaService.update(idfactura, updatedFactura);
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Ruta para eliminar una factura
router.delete('/facturas/:idfactura', async (req, res) => {
  const { idfactura } = req.params;
  try {
    const result = await FacturaService.delete(idfactura);
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
