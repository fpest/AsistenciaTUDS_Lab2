"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) =>{

class Cursa extends Model {

/*
  static associate(models) {
      Categoria.hasMany(models.Lista, { foreignKey: "idCategoria" });
}
*/
}

  Cursa.init(
    {
    idUsuario: {
      type: DataTypes.INTEGER,
    },
    idMateria: {
        type: DataTypes.INTEGER,
    },
    validado: {
      type: DataTypes.STRING,
    }},{    
      sequelize,
      timestamp : true,
      createdAt: false,
      updatedAt: false,
      modelName: "Cursa"});
return Cursa;
};