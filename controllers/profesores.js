const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
const Materia = require("../models").Materia;
const Usuario = require("../models").Usuario;
const { Op } = require("sequelize");





exports.principalProfesores = async function (req, res) {
 console.log("viene la lista arriba")
  req.session.mensaje = "Profesores";
  user = req.session.usuarioCompleto

  const alumnos = await Usuario.findAll({ where: {[Op.and]: [{ rol: 'Alumno'  }, { habilitado: true }]}});
  const materias = await Materia.findAll({ where: {habilitado: true}})        
            
            return res.render("./profesor",{alumnos: alumnos, materias: materias, user: user});
  

};

 

