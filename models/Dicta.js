"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) =>{

class Dicta extends Model {

/*
  static associate(models) {
      Categoria.hasMany(models.Lista, { foreignKey: "idCategoria" });
}
*/
}

  Dicta.init(
    {
    idDicta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idMateria: {
        type: DataTypes.INTEGER,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
    },
    habilitado: {
      type: DataTypes.BOOLEAN,
    }
  },{    
      sequelize,
      timestamp : true,
      createdAt: false,
      updatedAt: false,
      modelName: "Dicta"});
return Dicta;
};