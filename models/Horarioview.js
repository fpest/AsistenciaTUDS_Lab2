"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) =>{

class Horarioview extends Model {

/*
  static associate(models) {
      Categoria.hasMany(models.Lista, { foreignKey: "idCategoria" });
}
*/
}

Horarioview.init(
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
      },
    diasemana: {
        type: DataTypes.STRING,
      },
    horainicio: {
        type: DataTypes.INTEGER,
      },
    horafin: {
        type: DataTypes.INTEGER,
      }        
    },{    
      sequelize,
      timestamp : true,
      createdAt: false,
      updatedAt: false,
      modelName: "Horarioview"});
return Horarioview;
};