class OperadorTarifa {
  constructor(idtarifa, idoperador, anio, mes, valorkh, idsede) {
    this.idtarifa = idtarifa;
    this.idoperador = idoperador;
    this.anio = anio;
    this.mes = mes;
    this.valorkh = valorkh;
    this.idsede = idsede;
  }
}

module.exports = OperadorTarifa;
