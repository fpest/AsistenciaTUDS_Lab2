const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
const Materia = require("../models").Materia;
const Usuario = require("../models").Usuario;
const cursa = require("../models").Cursa;
const Dicta = require("../models").Dicta;
const { Op } = require("sequelize");
const { sequelize, Sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const fechaHoy = require("../middleware/fecha");

exports.estadoinscripcion = async function (req, res) {
  console.log("cambio de estado")
  
  var idMateria = parseInt(req.params.idMateria) 
  
  var idUsuario = parseInt(req.params.idUsuario)

  var estado = req.params.estado
  var vali = ""

  if (estado == 'pendiente') vali='aceptada'
  if (estado == 'aceptada') vali = 'no validado'
  if (estado == 'no validado') vali = 'pendiente'


  cursa.update(
    { validado: vali },
    { where: { idUsuario: idUsuario, idMateria: idMateria } }
  )
  res.redirect('back');
};



exports.pedidoinscripcion = async function (req, res) {
   
    var idMateria = parseInt(req.params.idMateria) 
    
    var idUsuario = parseInt(req.params.idUsuario)


    cursa.create(
      { idMateria: idMateria, idUsuario: idUsuario, validado: 'pendiente' }
    )
    res.redirect('back');
};


exports.validarinscripcion = async function (req, res) {
  console.log("validar")
  
  user = req.session.usuarioCompleto
  var hoy = fechaHoy();
  var alumnos
  var listaalumnos = []
  var nuevalista = []
  
  const materiadicta = await Dicta.findAll({ where: {idUsuario: user.id}})
  alumnos =  await sequelize.query("SELECT usu.`id` as id,usu.`nombre` as nombre,`apellido` as apellido, mat.idMateria, mat.nombre as materia, mat.cicloLectivo as periodo, cur.validado as estado FROM `usuarios` usu inner join cursas cur on usu.id = cur.idUsuario inner join materia mat on cur.idMateria = mat.idMateria order by mat.nombre ASC, cur.validado DESC"  , { type: QueryTypes.SELECT })
 
 
  materiadicta.forEach(md => { 
      alumnos.forEach(e => {

      console.log(e.idMateria + " md id " + md.idMateria)

      if (e.idMateria==md.idMateria) listaalumnos.push(e)

    });
  })


  
  return res.render("./validarinscripcion", {hoy: hoy, user: user, alumnos: listaalumnos })
  
    


}