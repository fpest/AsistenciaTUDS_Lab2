"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) =>{

class Dictaview extends Model {






/*
  static associate(models) {
      Categoria.hasMany(models.Lista, { foreignKey: "idCategoria" });
}
*/
}

  Dictaview.init(
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
    },
    idUsuario: {
      type: DataTypes.INTEGER,
    },
    acargo: {
      type: DataTypes.BOOLEAN,
    }
    },{    
      sequelize,
      timestamp : true,
      createdAt: false,
      updatedAt: false,
      modelName: "Dictaview"});


return Dictaview;
};