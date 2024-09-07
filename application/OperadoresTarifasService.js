const db = require('../infrastructure/Database');

class OperadorTarifaService {
  // Verificar si la tarifa ya existe
  static async exists(idoperador, idsede, anio, mes) {
    const sql = `
      SELECT COUNT(*) AS count
      FROM operadores_tarifas
      WHERE idoperador = ? AND idsede = ? AND anio = ? AND mes = ?
    `;
    const [result] = await db.query(sql, [idoperador, idsede, anio, mes]);
    return result[0].count > 0;
  }
  
  static async create(operadorTarifa) {
    // Convertir tipos de datos
    const idoperador = parseInt(operadorTarifa.idoperador, 10);
    const anio = parseInt(operadorTarifa.anio, 10);
    const mes = parseInt(operadorTarifa.mes, 10); // Convertir mes a entero
    const valorkh = parseFloat(operadorTarifa.valorkh);
    const idsede = parseInt(operadorTarifa.idsede, 10);
  
    // Verificar si la tarifa ya existe
    console.log('Verificando si existe la tarifa:', { idoperador, anio, mes, valorkh, idsede });
    const tarifaExiste = await this.exists(idoperador, idsede, anio, mes);
    console.log('Resultado de existencia:', tarifaExiste);
  
    if (tarifaExiste) {
      throw new Error('Ya existe una tarifa registrada para ese operador en el mes y año seleccionados.');
    }
  
    const sql = `
      INSERT INTO operadores_tarifas (idoperador, anio, mes, valorkh, idsede) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [idoperador, anio, mes, valorkh, idsede];
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
      SET idoperador = ?, anio = ?, mes = ?, valorkh = ?, idsede = ?
      WHERE idtarifa = ?
    `;
    const values = [
      updatedTarifa.idoperador,
      updatedTarifa.anio,
      updatedTarifa.mes,
      updatedTarifa.valorkh,
      updatedTarifa.idsede, // Corregido
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
