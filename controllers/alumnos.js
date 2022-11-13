const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
const Materia = require("../models").Materia;
const Usuario = require("../models").Usuario;
const { Op } = require("sequelize");





exports.principalAlumnos = async function (req, res) {
 console.log("viene la lista arriba")
  req.session.mensaje = "Alumnos";
  user = req.session.usuarioCompleto

    const materias = await Materia.findAll({ where: {habilitado: true}})        
            
            return res.render("./alumno",{materias: materias, user: user});
  

};

 

