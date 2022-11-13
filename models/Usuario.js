"use strict";
const { Sequelize, Model, DataTypes } = require("sequelize");


module.exports = (sequelize, DataTypes) =>{

class Usuario extends Model {

/*
  static associate(models) {
      Categoria.hasMany(models.Lista, { foreignKey: "idCategoria" });
}
*/
}

  Usuario.init(
    {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellido: {
      type: DataTypes.STRING,
    },
    eMail: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    rol: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
    },
    habilitado: {
      type: DataTypes.BOOLEAN,
    }},{

      sequelize,
      timestamp : true,
      createdAt: false,
      updatedAt: false,
      modelName: "Usuario"});
return Usuario;
};