const express = require('express');
const { body, validationResult, param } = require('express-validator');
const OperadorService = require('../../application/OperadorService');
const Operador = require('../../core/domain/Operador');

const router = express.Router();

// Crear un nuevo operador
router.post('/operadores', 
  body('nombre').notEmpty().withMessage('Nombre es requerido'),
  body('sitioweb').isURL().withMessage('Sitio web debe ser una URL válida'),
  body('contacto').notEmpty().withMessage('Contacto es requerido'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array().map(error => error.msg).join(', ') });
    }

    const { nombre, sitioweb, contacto } = req.body;
    const operador = new Operador(nombre, sitioweb, contacto);

    try {
      const result = await OperadorService.create(operador);
      res.json({ success: true, message: 'Operador creado', operador: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Obtener todos los operadores
router.get('/operadores', async (req, res) => {
  try {
    const operadores = await OperadorService.getAll();
    res.json(operadores);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Obtener un operador por ID
router.get('/operadores/:id',
  param('id').isInt().withMessage('ID debe ser un número entero'),
  async (req, res) => {
    const { id } = req.params;

    try {
      const operador = await OperadorService.getById(id);
      if (!operador) {
        return res.status(404).json({ success: false, message: 'Operador no encontrado' });
      }
      res.json(operador);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Actualizar un operador
router.put('/operadores/:id',
  param('id').isInt().withMessage('ID debe ser un número entero'),
  body('nombre').notEmpty().withMessage('Nombre es requerido'),
  body('sitioweb').isURL().withMessage('Sitio web debe ser una URL válida'),
  body('contacto').notEmpty().withMessage('Contacto es requerido'),
  async (req, res) => {
    const { id } = req.params;
    const { nombre, sitioweb, contacto } = req.body;

    try {
      const operador = new Operador(nombre, sitioweb, contacto);
      const result = await OperadorService.update(id, operador);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Operador no encontrado' });
      }
      res.json({ success: true, message: 'Operador actualizado', operador: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Eliminar un operador
router.delete('/operadores/:id',
  param('id').isInt().withMessage('ID debe ser un número entero'),
  async (req, res) => {
    const { id } = req.params;

    try {
      const result = await OperadorService.delete(id);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Operador no encontrado' });
      }
      res.json({ success: true, message: 'Operador eliminado' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
