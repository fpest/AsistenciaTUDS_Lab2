const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
const Materia = require("../models").Materia;
const Usuario = require("../models").Usuario;
const { Op } = require("sequelize");





exports.principalCoordinadores = async function (req, res) {
 console.log("viene la lista arriba")
  req.session.mensaje = "Coordinadores";
  user = req.session.usuarioCompleto

  const profesores = await Usuario.findAll({ where: {[Op.and]: [{ rol: 'Profesor'  }, { habilitado: true }]}});
    
    const listaProfesores = profesores.map((profesor) => {
            return {legajo:profesor.id , nombre:profesor.nombre , apellido:profesor.apellido,
              dni:profesor.dni , eMail: profesor.eMail, rol: profesor.rol};
            })
            console.log("viene la lista")
            console.log(user)

    const materias = await Materia.findAll({ where: {habilitado: true}})        
            
            return res.render("./coordinador",{listaProfesores: listaProfesores, materias: materias, user: user});
  

};

 

