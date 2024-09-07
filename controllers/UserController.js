const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');
const UserService = require('../application/UserService');
const User = require('../core/domain/User');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', 
  body('nombre').notEmpty().withMessage('Nombre es requerido'),
  body('email').isEmail().withMessage('Email debe ser válido'),
  body('password').isLength({ min: 6 }).withMessage('Contraseña debe tener al menos 6 caracteres'),
  body('cargo').notEmpty().withMessage('Cargo es requerido'),
  body('estado').isInt().withMessage('Estado debe ser un número entero'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array().map(error => error.msg).join(', ') });
    }

    const { nombre, email, password, cargo, estado } = req.body;
    const user = new User(nombre, email, password, cargo, estado);

    try {
      const result = await UserService.register(user);
      res.json({ success: true, message: result.message });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Ruta para validar el login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.login(email, password);
    res.json({ success: true, message: 'Login exitoso', usuario: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
