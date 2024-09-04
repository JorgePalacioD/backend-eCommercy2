const db = require('../infrastructure/Database');

class OperadorTarifaService {
  // Crear una nueva tarifa
  static async create(operadorTarifa) {
    const sql = `
      INSERT INTO operadores_tarifas (idoperador, anio, mes, valorkh) 
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      operadorTarifa.idoperador,
      operadorTarifa.anio,
      operadorTarifa.mes,
      operadorTarifa.valorkh
    ];
    await db.query(sql, values);
    return { message: 'Tarifa creada exitosamente' };
  }

  // Obtener todas las tarifas
  static async getAll() {
    const sql = 'SELECT * FROM operadores_tarifas';
    const [tarifas] = await db.query(sql);
    return tarifas;
  }

  // Obtener una tarifa por ID
  static async getById(idtarifa) {
    const sql = 'SELECT * FROM operadores_tarifas WHERE idtarifa = ?';
    const [tarifa] = await db.query(sql, [idtarifa]);
    if (!tarifa.length) {
      throw new Error('Tarifa no encontrada');
    }
    return tarifa[0];
  }

  // Actualizar una tarifa
  static async update(idtarifa, updatedTarifa) {
    const sql = `
      UPDATE operadores_tarifas 
      SET idoperador = ?, anio = ?, mes = ?, valorkh = ?
      WHERE idtarifa = ?
    `;
    const values = [
      updatedTarifa.idoperador,
      updatedTarifa.anio,
      updatedTarifa.mes,
      updatedTarifa.valorkh,
      idtarifa
    ];
    await db.query(sql, values);
    return { message: 'Tarifa actualizada exitosamente' };
  }

  // Eliminar una tarifa
  static async delete(idtarifa) {
    const sql = 'DELETE FROM operadores_tarifas WHERE idtarifa = ?';
    await db.query(sql, [idtarifa]);
    return { message: 'Tarifa eliminada exitosamente' };
  }
}

module.exports = OperadorTarifaService;
