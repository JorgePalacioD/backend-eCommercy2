const express = require('express');
const FacturaService = require('../application/FacturasService');
const Factura = require('../core/domain/Facturas');
const db = require('../infrastructure/Database')
const router = express.Router();

// Ruta para crear una nueva factura
router.post('/facturas', (req, res) => {
  const { numerofac, idoperador, sede, fecha, anio, mes, cantidadkh, valor_kwh, valor_factura, idusuario } = req.body;

  console.log('Datos recibidos:', {
    numerofac, idoperador, sede, fecha, anio, mes, cantidadkh, valor_kwh, valor_factura, idusuario
  });

  // Asegúrate de que los datos están bien definidos y realiza la inserción en la base de datos
  const sql = 'INSERT INTO facturas (idoperador, numerofac, fecha, sede, anio, mes, cantidadkh, valor_factura, idusuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [idoperador, numerofac, fecha, sede, anio, mes, cantidadkh, valor_factura, idusuario];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar la factura:', err);
      res.status(500).json({ error: 'Error al insertar la factura' });
    } else {
      res.status(200).json({ success: true });
    }
  });
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

// Ruta para obtener los años disponibles en las facturas
router.get('/facturas/anio/:anio', async (req, res) => {
  try {
    const anio = req.params.anio;
    const facturas = await FacturaService.getByAnio(anio);
    res.json(facturas);
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    res.status(500).json({ message: 'Error en la respuesta de la API' });
  }

});

// Ruta para actualizar una factura
router.put('/facturas/numerofac/:numerofac', async (req, res) => {
  const { numerofac } = req.params; // Obtenemos el numerofac de la URL
  const { idoperador, fecha, sede, anio, mes, cantidadkh, valor_factura, idusuario } = req.body;

  const updatedFactura = new Factura(numerofac, idoperador, numerofac, fecha, sede, anio, mes, cantidadkh, valor_factura, idusuario);
  try {
    const result = await FacturaService.updateByNumerofac(numerofac, updatedFactura);
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
// Ruta para obtener tarifas por idoperador y idsede
router.get('/operadores_tarifa/:idoperador/:idsede', async (req, res) => {
  const { idoperador, idsede } = req.params;
  try {
    const tarifas = await FacturaService.getTarifasByIdOperadorSede(idoperador, idsede);
    res.json({ success: true, data: tarifas });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/test', (req, res) => {
  res.json({ message: 'Ruta de prueba' });
});


module.exports = router;
