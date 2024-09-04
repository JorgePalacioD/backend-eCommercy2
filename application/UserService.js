const bcrypt = require('bcrypt');
const db = require('../infrastructure/Database');

class UserService {
  static async register(user) {
    const { nombre, email, password, cargo, estado } = user;

    // Verifica si el email ya existe
    const checkEmailSql = 'SELECT * FROM usuarios WHERE email = ?';
    const [existingUsers] = await db.query(checkEmailSql, [email]);
    if (existingUsers.length > 0) {
      throw new Error('El email ya está registrado');
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Registrar usuario
    const sql = 'INSERT INTO usuarios (nombre, email, password, cargo, estado) VALUES (?, ?, ?, ?, ?)';
    await db.query(sql, [nombre, email, hashedPassword, cargo, estado]);

    return { message: 'Usuario registrado' };
  }

  static async login(email, password) {
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    const [users] = await db.query(sql, [email]);

    if (users.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  }
}

module.exports = UserService;
