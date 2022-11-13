const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
var fechaHoy = require("../middleware/fecha");
const Materia = require("../models").Materia;
const { Op } = require("sequelize");




exports.antesinsertar = async function (req, res) {
  console.log("Dentro de insertar Materias...---")
  var hoy = fechaHoy();
  return res.render("./altamateria", {hoy: hoy });
  }

 
  exports.insertarRegistroMateria = async function (req, res) {
    
    console.log("Dentro de insertarRegistro");
    console.log(req)
    const nombre = req.body.nombre
    const fechaInicioCursada = req.body.fechaInicioCursada
    const fechaFinCursada = req.body.fechaFinCursada
    const cicloLectivo = req.body.cicloLectivo
    const numerocicloLectivo = parseInt(cicloLectivo);
    var hoy = fechaHoy()
    console.log(nombre);
    console.log(cicloLectivo);
    console.log(fechaInicioCursada);
    console.log(fechaFinCursada);

    const nuevaMateria = await Materia.create({
        nombre: nombre,
        cicloLectivo: numerocicloLectivo,
        fechaInicioCursada: fechaInicioCursada,
        fechaFinCursada: fechaFinCursada,
        habilitado: true
    })
    .then((result) => {
      var mensaje = "Materia Registrada"
      
      return res.render("./altamateria", {mensaje: mensaje, hoy: hoy });  
    })
    .catch((err) =>{
      var mensaje = "No se pudo Registrar"
      return res.render("./altamateria", {mensaje: mensaje, hoy: hoy });  
  
    });
    
    //return res.render("./coordinador");
   
/*
    if (!usuarioExistente){
    nuevoUsuario = await Usuario.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      eMail: req.body.eMail,
      dni:req.body.dni,
      password:passwordEncriptada,
      habilitado:1,
      rol:"Alumno"})
    }else{
      var error = {error:"Usuario Existente"}
      console.log("El else de Usuario Existente: ")
    }
    
    if (error) res.render('./registrarse', error);
    else  res.render('./index');

*/

  }; 




