"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) =>{

class Horario extends Model {

/*
  static associate(models) {
      Categoria.hasMany(models.Lista, { foreignKey: "idCategoria" });
}
*/
}

Horario.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
          },
    diaHoraInicio: {
        type: DataTypes.DATE,
    },
    duracion: {
      type: DataTypes.DOUBLE,
    },
    seDicta: {
        type: DataTypes.BOOLEAN,
      },
    idMateria: {
        type: DataTypes.INTEGER,
      },
    idDicta: {
          type: DataTypes.INTEGER,
      },
    periodoMateria: {
        type: DataTypes.INTEGER,
      }
    },{    
      sequelize,
      timestamp : true,
      createdAt: false,
      updatedAt: false,
      modelName: "Horario"});
return Horario;
};