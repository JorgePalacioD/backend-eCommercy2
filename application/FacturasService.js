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
      factura.fecha,
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
    const sql = 'SELECT * FROM facturas';
    const [facturas] = await db.query(sql);
    return facturas;
  }

  // Obtener una factura por ID
  static async getById(idfactura) {
    const sql = 'SELECT * FROM facturas WHERE idfactura = ?';
    const [factura] = await db.query(sql, [idfactura]);
    if (!factura.length) {
      throw new Error('Factura no encontrada');
    }
    return factura[0];
  }

  // Actualizar una factura
  static async update(idfactura, updatedFactura) {
    const sql = `
      UPDATE facturas 
      SET idoperador = ?, numerofac = ?, fecha = ?, sede = ?, anio = ?, mes = ?, 
          cantidadkh = ?, valor_factura = ?, idusuario = ?
      WHERE idfactura = ?
    `;
    const values = [
      updatedFactura.idoperador,
      updatedFactura.numerofac,
      updatedFactura.fecha,
      updatedFactura.sede,
      updatedFactura.anio,
      updatedFactura.mes,
      updatedFactura.cantidadkh,
      updatedFactura.valor_factura,
      updatedFactura.idusuario,
      idfactura
    ];
    await db.query(sql, values);
    return { message: 'Factura actualizada exitosamente' };
  }

  // Eliminar una factura
  static async delete(idfactura) {
    const sql = 'DELETE FROM facturas WHERE idfactura = ?';
    await db.query(sql, [idfactura]);
    return { message: 'Factura eliminada exitosamente' };
  }
}

module.exports = FacturaService;
