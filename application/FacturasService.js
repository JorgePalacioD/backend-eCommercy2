const db = require('../infrastructure/Database');

class FacturaService {
  // Crear una nueva factura
  static async create(factura) {
    const sql = `
      INSERT INTO facturas (idoperador, numerofac, fecha, sede, anio, mes, cantidadkh, valor_factura, idusuario) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      factura.idoperador,
      factura.numerofac,
      new Date(factura.fecha).toISOString().split('T')[0], // Convertir la fecha
      factura.sede,
      factura.anio,
      factura.mes,
      factura.cantidadkh,
      factura.valor_factura,
      factura.idusuario
    ];
    await db.query(sql, values);
    return { message: 'Factura creada exitosamente' };
  }

  // Obtener todas las facturas
  static async getAll() {
    const sql = `
      SELECT f.*, s.idsede AS sedeId, s.nombre AS sedeNombre
      FROM facturas f
      JOIN sedes s ON f.sede = s.idsede
    `;
    const [facturas] = await db.query(sql);
    return facturas;
  }

  // Obtener una factura por ID
  static async getById(idfactura) {
    const sql = 'SELECT * FROM facturas WHERE idfactura = ?';
    const [factura] = await db.query(sql, [idfactura]);
    if (factura.length === 0) {
      throw new Error('Factura no encontrada');
    }
    return factura[0];
  }

  // Actualizar una factura
  static async updateByNumerofac(numerofac, updatedFactura) {
    const sql = `
      UPDATE facturas 
      SET idoperador = ?, fecha = ?, sede = ?, anio = ?, mes = ?, 
          cantidadkh = ?, valor_factura = ?, idusuario = ?
      WHERE numerofac = ?
    `;
    const values = [
      updatedFactura.idoperador,
      new Date(updatedFactura.fecha).toISOString().split('T')[0],
      updatedFactura.sede,
      updatedFactura.anio,
      updatedFactura.mes,
      updatedFactura.cantidadkh,
      updatedFactura.valor_factura,
      updatedFactura.idusuario,
      numerofac
    ];
    console.log('Valores para actualización:', values);
    await db.query(sql, values);
    return { message: 'Factura actualizada exitosamente' };
  }

  // Eliminar una factura
  static async delete(idfactura) {
    const sql = 'DELETE FROM facturas WHERE idfactura = ?';
    await db.query(sql, [idfactura]);
    return { message: 'Factura eliminada exitosamente' };
  }

  // Obtener tarifas por idoperador y idsede
  static async getTarifasByIdOperadorSede(idoperador, idsede) {
    const sql = `
      SELECT ot.*, s.nombre AS sedeNombre
      FROM operadores_tarifas ot
      JOIN sedes s ON ot.idsede = s.idsede
      WHERE ot.idoperador = ? AND ot.idsede = ?
    `;
    const [result] = await db.query(sql, [idoperador, idsede]);
    if (result.length === 0) {
      throw new Error('No se encontraron tarifas para el operador y sede especificados');
    }
    return result;
  }
}

module.exports = FacturaService;
