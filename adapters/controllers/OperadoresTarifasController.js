const express = require('express');
const OperadorTarifaService = require('../../application/OperadoresTarifasService');
const OperadorTarifa = require('../../core/domain/OperadoresTarifas');

const router = express.Router();

// Ruta para crear una nueva tarifa
router.post('/operadores_tarifas', async (req, res) => {
  const { idoperador, anio, mes, valorkh } = req.body;
  const operadorTarifa = new OperadorTarifa(null, idoperador, anio, mes, valorkh);
  try {
    const result = await OperadorTarifaService.create(operadorTarifa);
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Ruta para obtener todas las tarifas
router.get('/operadores_tarifas', async (req, res) => {
  try {
    const tarifas = await OperadorTarifaService.getAll();
    res.json({ success: true, data: tarifas });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Ruta para obtener una tarifa por ID
router.get('/operadores_tarifas/:idtarifa', async (req, res) => {
  const { idtarifa } = req.params;
  try {
    const tarifa = await OperadorTarifaService.getById(idtarifa);
    res.json({ success: true, data: tarifa });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Ruta para actualizar una tarifa
router.put('/operadores_tarifas/:idtarifa', async (req, res) => {
  const { idtarifa } = req.params;
  const { idoperador, anio, mes, valorkh } = req.body;
  const updatedTarifa = new OperadorTarifa(idtarifa, idoperador, anio, mes, valorkh);
  try {
    const result = await OperadorTarifaService.update(idtarifa, updatedTarifa);
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Ruta para eliminar una tarifa
router.delete('/operadores_tarifas/:idtarifa', async (req, res) => {
  const { idtarifa } = req.params;
  try {
    const result = await OperadorTarifaService.delete(idtarifa);
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
