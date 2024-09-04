const db = require('../infrastructure/Database');
const Sedes = require('../core/domain/Sedes');

class SedesService {
  static async create(sede) {
    const { nombre, codigo_sede, codigo_niu } = sede;
    const sql = 'INSERT INTO sedes (nombre, codigo_sede, codigo_niu) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [nombre, codigo_sede, codigo_niu]);

    sede.id = result.insertId;
    return sede;
  }

  static async getAll() {
    const sql = 'SELECT * FROM sedes';
    const [sedes] = await db.query(sql);
    return sedes;
  }

  static async getById(id) {
    const sql = 'SELECT * FROM sedes WHERE idsede = ?';
    const [sedes] = await db.query(sql, [id]);

    if (sedes.length === 0) {
      return null;
    }
    return sedes[0];
  }

  static async update(id, sede) {
    const { nombre, codigo_sede, codigo_niu } = sede;
    const sql = 'UPDATE sedes SET nombre = ?, codigo_sede = ?, codigo_niu = ? WHERE idsede = ?';
    const [result] = await db.query(sql, [nombre, codigo_sede, codigo_niu, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    sede.id = id;
    return sede;
  }

  static async delete(id) {
    const sql = 'DELETE FROM sedes WHERE idsede = ?';
    const [result] = await db.query(sql, [id]);

    return result.affectedRows > 0;
  }
}

module.exports = SedesService;
