const express = require('express');
const { body, validationResult, param } = require('express-validator');
const SedesService = require('../../application/SedesService');
const Sedes = require('../../core/domain/Sedes');

const router = express.Router();

// Crear una nueva sede
router.post('/sedes', 
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('codigo_sede').isInt().withMessage('El codigo de la sede debe ser un número entero'),
  body('codigo_niu').isInt().withMessage('El codigo niu debe ser un número entero'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array().map(error => error.msg).join(', ') });
    }

    const { nombre, codigo_sede, codigo_niu } = req.body;
    const sede = new Sedes(nombre, codigo_sede, codigo_niu);

    try {
      const result = await SedesService.create(sede);
      res.json({ success: true, message: 'Sede creada', sede: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Obtener todas las sedes
router.get('/sedes', async (req, res) => {
  try {
    const sedes = await SedesService.getAll();
    res.json(sedes);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Obtener una sede por ID
router.get('/sedes/:id', 
  param('id').isInt().withMessage('ID debe ser un número entero'),
  async (req, res) => {
    const { id } = req.params;

    try {
      const sede = await SedesService.getById(id);
      if (!sede) {
        return res.status(404).json({ success: false, message: 'Sede no encontrada' });
      }
      res.json(sede);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Actualizar una sede
router.put('/sedes/:id', 
  param('id').isInt().withMessage('ID debe ser un número entero'),
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('codigo_sede').isInt().withMessage('El codigo de la sede debe ser un número entero'),
  body('codigo_niu').isInt().withMessage('El codigo niu debe ser un número entero'),
  async (req, res) => {
    const { id } = req.params;
    const { nombre, codigo_sede, codigo_niu } = req.body;

    try {
      const sede = new Sedes(nombre, codigo_sede, codigo_niu);
      const result = await SedesService.update(id, sede);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Sede no encontrada' });
      }
      res.json({ success: true, message: 'Sede actualizada', sede: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Eliminar una sede
router.delete('/sedes/:id', 
  param('id').isInt().withMessage('ID debe ser un número entero'),
  async (req, res) => {
    const { id } = req.params;

    try {
      const result = await SedesService.delete(id);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Sede no encontrada' });
      }
      res.json({ success: true, message: 'Sede eliminada' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
