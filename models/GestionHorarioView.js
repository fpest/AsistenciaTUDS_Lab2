"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) =>{

class GestionHorarioView extends Model {

/*
  static associate(models) {
      Categoria.hasMany(models.Lista, { foreignKey: "idCategoria" });
}
*/
}

GestionHorarioView.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
          },
    idMateria: {
        type: DataTypes.INTEGER,
      },
    lunesinicio: {
        type: DataTypes.INTEGER,
      },
    lunesduracion: {
        type: DataTypes.INTEGER,
      },
    martesinicio: {
        type: DataTypes.INTEGER,
      },
    martesduracion: {
        type: DataTypes.INTEGER,
      },
    miercolesinicio: {
        type: DataTypes.INTEGER,
      },
    miercolesduracion: {
        type: DataTypes.INTEGER,
      },
    juevesinicio: {
        type: DataTypes.INTEGER,
      },
    juevesduracion: {
        type: DataTypes.INTEGER,
      },
    viernesinicio: {
        type: DataTypes.INTEGER,
      },
    viernesduracion: {
        type: DataTypes.INTEGER,
      }

    },{    
      sequelize,
      timestamp : true,
      createdAt: false,
      updatedAt: false,
      modelName: "GestionHorarioView"});
return GestionHorarioView;
};