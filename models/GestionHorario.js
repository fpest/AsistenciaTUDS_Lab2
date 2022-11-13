"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) =>{

class GestionHorario extends Model {

/*
  static associate(models) {
      Categoria.hasMany(models.Lista, { foreignKey: "idCategoria" });
}
*/
}

GestionHorario.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
          },
    idMateria: {
        type: DataTypes.INTEGER,
      },
    diaSemana: {
          type: DataTypes.STRING,
      },
    horaInicio: {
        type: DataTypes.DATE,
    },
      duracion: {
        type: DataTypes.DOUBLE,
      }
    },{    
      sequelize,
      timestamp : true,
      createdAt: false,
      updatedAt: false,
      modelName: "GestionHorario"});
return GestionHorario;
};