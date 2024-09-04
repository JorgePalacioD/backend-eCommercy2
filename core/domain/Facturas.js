class Factura {
  constructor(idfactura, idoperador, numerofac, fecha, sede, anio, mes, cantidadkh, valor_factura, idusuario) {
    this.idfactura = idfactura;
    this.idoperador = idoperador;
    this.numerofac = numerofac;
    this.fecha = fecha;
    this.sede = sede;
    this.anio = anio;
    this.mes = mes;
    this.cantidadkh = cantidadkh;
    this.valor_factura = valor_factura;
    this.idusuario = idusuario;
  }
}

module.exports = Factura;
