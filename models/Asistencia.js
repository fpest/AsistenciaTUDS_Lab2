"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) =>{

class Asistencia extends Model {

/*
  static associate(models) {
      Categoria.hasMany(models.Lista, { foreignKey: "idCategoria" });
}
*/
}

Asistencia.init(
    {
    idUsuario: {
      type: DataTypes.INTEGER,
    },
    idHorario: {
        type: DataTypes.INTEGER,
    },
    presente: {
      type: DataTypes.BOOLEAN,
    },
    diaHoraRegistro: {
        type: DataTypes.DATE,
      }},{    
        sequelize,
        timestamp : true,
        createdAt: false,
        updatedAt: false,
      modelName: "Asistencia"});
return Asistencia;
};