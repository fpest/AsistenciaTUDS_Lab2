const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
const Materia = require("../models").Materia;
const Usuario = require("../models").Usuario;
const Cursa = require("../models").Cursa;
const { Op } = require("sequelize");
const { sequelize, Sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const { use } = require("../routes/materias");
const fechaArg = require("../middleware/fechaArg");






exports.asistenciaalumno = async function (req, res) {
  console.log("asistencia alumnos")
   req.session.mensaje = "Alumnos";
   user = req.session.usuarioCompleto
   
   var materias = []
   var listamaterias = []
 
  const idmateriascursa = await Cursa.findAll({
    where: { idUsuario: user.id, validado: 'aceptada' },
  });
 
 
   return res.render("./asistenciaalumno",{materias: idmateriascursa, user: user});
   
 
     }
 
  
 
 









exports.principalAlumnos = async function (req, res) {
 console.log("viene la lista arriba")
  req.session.mensaje = "Alumnos";
  user = req.session.usuarioCompleto
  var materias = []
  var listamaterias = []

  const mismateriaspedidas = await sequelize.query("SELECT mat.`idMateria`,mat.`nombre`as nombre,`fechaInicioCursada`,`fechaFinCursada`,`cicloLectivo`,mat.`habilitado`, usu.id as id  FROM `materia` mat inner join `cursas` cur on cur.idMateria = mat.idMateria inner join `usuarios` usu on usu.id = cur.idUsuario where cur.idUsuario = " + user.id, { type: QueryTypes.SELECT });
  const mismaterias = await sequelize.query("SELECT mat.`idMateria`,mat.`nombre`as nombre,`fechaInicioCursada`,`fechaFinCursada`,`cicloLectivo`,mat.`habilitado`, usu.id as id  FROM `materia` mat inner join `cursas` cur on cur.idMateria = mat.idMateria inner join `usuarios` usu on usu.id = cur.idUsuario where cur.validado = 'aceptada' and cur.idUsuario = " + user.id, { type: QueryTypes.SELECT });

  mismaterias.forEach(mm => {
    mm.fechaInicioCursada = fechaArg(mm.fechaInicioCursada)
    mm.fechaFinCursada = fechaArg(mm.fechaFinCursada)
  });

  if (mismateriaspedidas.lenght == 0){

    materias = await Materia.findAll({ where: {habilitado: true}})
    }else{ 

    const cursa = await Cursa.findAll({ where: {idUsuario: user.id}})

    materias = await Materia.findAll({ where: {habilitado: true}})

    
        
    materias.forEach(e => {
      mat = {
        idMateria : e.idMateria,
        nombre: e.nombre,
        fechaInicioCursada: e.fechaInicioCursada,
        fechaFinCursada: e.fechaFinCursada,
        cicloLectivo: e.cicloLectivo,
        habilitado: true,
        estado: ""
       }


        cursa.forEach(c => {
      if (e.idMateria == c.idMateria){
     mat = {
      idMateria : e.idMateria,
      nombre: e.nombre,
      fechaInicioCursada: e.fechaInicioCursada,
      fechaFinCursada: e.fechaFinCursada,
      cicloLectivo: e.cicloLectivo,
      habilitado: true,
      estado: c.validado
     }

     
      }
     
    })
    if (mat.estado != 'aceptada'){listamaterias.push(mat)}
  })

  }

      console.log("viene la lista de materias")
      console.log(listamaterias)
      return res.render("./alumno",{materias: listamaterias, mismaterias: mismaterias, user: user});
  

    }

 

