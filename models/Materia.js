"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) =>{

class Materia extends Model {

/*
  static associate(models) {
      Categoria.hasMany(models.Lista, { foreignKey: "idCategoria" });
}
*/
}

  Materia.init(
    {
    idMateria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    cicloLectivo: {
      type: DataTypes.INTEGER,
    },
    fechaInicioCursada: {
      type: DataTypes.DATE,
    },
    fechaFinCursada: {
      type: DataTypes.DATE,
    },
    habilitado: {
      type: DataTypes.BOOLEAN,
    }
    },{    
      sequelize,
      timestamp : true,
      createdAt: false,
      updatedAt: false,
      modelName: "Materia"});
return Materia;
};