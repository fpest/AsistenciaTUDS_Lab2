const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
const Materia = require("../models").Materia;
const Usuario = require("../models").Usuario;
const Dicta = require("../models").Dicta;
const { Op } = require("sequelize");
const { sequelize, Sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const fechaHoy = require("../middleware/fecha");





exports.acargo = async function (req, res) {
    console.log("vendra?")
    
    var idMateria = parseInt(req.params.id) 
    
    var idProfesor = parseInt(req.params.idUsuario)
    var controlcheckedstring = req.params.controlchecked
    
    if (controlcheckedstring == "true"){controlchecked=true} else{controlchecked=false}
   

    const cantdicta = await Dicta.count({
        where: { idMateria: idMateria, idUsuario: idProfesor },
      });

    const listadicta = await Dicta.findAll()
    const materias = await Materia.findAll({ where: {habilitado: true}})
    const profesorEditar = await Usuario.findOne({ where: { id: idProfesor }});
   
    user = req.session.usuarioCompleto
    
    if (cantdicta > 0){
      controlchecked= !controlchecked
      const hoy = fechaHoy();

      const dicta = await Dicta.update({
        habilitado: controlchecked,
    }, {
        where: {
            idMateria: idMateria, idUsuario: idProfesor
        }
    });
      
      const listadicta = await Dicta.findAll()
   
      res.redirect('back');
      //return res.render("./editarprofesor", 
      //{hoy: hoy, user: user, profesorEditar: profesorEditar, materias: materias, listadicta:listadicta });

    }    
    else
    {

      controlchecked= !controlchecked

      const dicta =  Dicta.create({
      idMateria: idMateria,
      idUsuario: idProfesor,
      habilitado: controlchecked,
  })
  .then((result) => {
   
   const hoy = fechaHoy();


   res.redirect('back');
   //return res.render("./editarprofesor", {hoy: hoy, user: user, profesorEditar: profesorEditar, materias: materias, listadicta:listadicta });
  })
  .catch((err) =>{

  var mensaje = "No se pudo Registrar"
  var hoy = fechaHoy()
  return res.render("./editarprofesor", {hoy: hoy, user: user, profesorEditar: profesorEditar, materias: materias, listadicta:listadicta });
  });       
}          
  
    
};

 

