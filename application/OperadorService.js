const db = require('../infrastructure/Database');
const Operador = require('../core/domain/Operador');

class OperadorService {
  static async create(operador) {
    const { nombre, sitioweb, contacto } = operador;
    const sql = 'INSERT INTO operadores (nombre, sitioweb, contacto) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [nombre, sitioweb, contacto]);

    operador.id = result.insertId;
    return operador;
  }

  static async getAll() {
    const sql = 'SELECT * FROM operadores';
    const [operadores] = await db.query(sql);
    return operadores;
  }

  static async getById(id) {
    const sql = 'SELECT * FROM operadores WHERE idoperador = ?';
    const [operadores] = await db.query(sql, [id]);

    if (operadores.length === 0) {
      return null;
    }
    return operadores[0];
  }

  static async update(id, operador) {
    const { nombre, sitioweb, contacto } = operador;
    const sql = 'UPDATE operadores SET nombre = ?, sitioweb = ?, contacto = ? WHERE idoperador = ?';
    const [result] = await db.query(sql, [nombre, sitioweb, contacto, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    operador.id = id;
    return operador;
  }

  static async delete(id) {
    const sql = 'DELETE FROM operadores WHERE idoperador = ?';
    const [result] = await db.query(sql, [id]);

    return result.affectedRows > 0;
  }

  
}

module.exports = OperadorService;
