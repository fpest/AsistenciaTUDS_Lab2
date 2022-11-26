const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
var fechaHoy = require("../middleware/fecha");
const Materia = require("../models").Materia;
const Usuario = require("../models").Usuario;
const Dicta = require("../models").Dicta;
const Dictaview = require("../models").Dictaview;
const { Op } = require("sequelize");
const { sequelize, Sequelize } = require('../models');
const { QueryTypes } = require('sequelize');



exports.antesinsertar = async function (req, res) {
  console.log("Dentro de insertar Profesores...---")
  user = req.session.usuarioCompleto
  var hoy = fechaHoy();
  return res.render("./altaprofesor", {hoy: hoy, user: user });
  }

  
exports.anteseditar = async function (req, res) {
    var idProfesor = req.params.id
    var hoy = fechaHoy();
    var coincide = false
  var dictaview = new Dictaview();
    var listadictaview = []
    user = req.session.usuarioCompleto
    
    
    const listadicta = await Dicta.findAll()
    const materiasl = await Materia.findAll({ where: {habilitado: true}})
    const profesorEditar = await Usuario.findOne({ where: { id: idProfesor }});
    
/*
    const  materiasl= await materiasbase.map((mate) => {
      
      return {idMateria:mate.idMateria , nombre:mate.nombre , ciclolectivo: mate.ciclolectivo , fechaInicioCursada: mate.fechaInicioCursada, fechaFinCursada: mate.fechaFinCursada};
      })
*/
      
    
materiasl.forEach(mate => {

      dictaview = []

      dictaview.idMateria = mate.idMateria
      dictaview.idUsuario = idProfesor
      dictaview.nombre = mate.nombre
      dictaview.cicloLectivo = mate.cicloLectivo
      dictaview.fechaInicioCursada = mate.fechaInicioCursada
      dictaview.fechaFinCursada = mate.fechaFinCursada
      dictaview.acargo = false
      
      
 
  if (listadicta.length>0){
      
    listadicta.forEach(dic => {
    
      
        if (mate.idMateria == dic.idMateria && dic.idUsuario == idProfesor && dic.habilitado)
        
        {
     
          coincide = true
        dictaview.acargo = true
      
      
    } //if que coincide idmateria y el idusuario
  
    }) // foreach de dicta

    } // if si existe algun vinculo en dicta 
    
    
    
    listadictaview.push(dictaview)
   


}); //Foreach Materia
      
console.log("antes de mandar a la pag")
console.log(hoy)
console.log(user)
console.log(profesorEditar)
console.log(listadicta)
console.log(listadictaview)
 
      return res.render("./editarprofesor", {hoy: hoy, user: user, profesorEditar: profesorEditar, listadicta: listadicta, listadictaview:listadictaview });

    }



exports.principalProfesores = async function (req, res) {
 console.log("viene la lista arriba")
  req.session.mensaje = "Profesores";
  user = req.session.usuarioCompleto

  const alumnos = await Usuario.findAll({ where: {[Op.and]: [{ rol: 'Alumno'  }, { habilitado: true }]}});
  
  const materias = await sequelize.query("SELECT * FROM `materia` mat inner Join dicta di ON di.idMateria=mat.idMateria WHERE mat.habilitado=true and (di.idUsuario = " + user.id + " and di.idMateria = mat.idMateria and di.habilitado = true)"  , { type: QueryTypes.SELECT });

  



            return res.render("./profesor",{alumnos: alumnos, materias: materias, user: user});
  

};


exports.insertarRegistroProfesor = async function (req, res) {
  var rol = ""
  var passwordEncriptada
  var nuevoUsuario
  const usuario = req.body.eMail
  const salt = await bcrypt.genSalt(10);
  passwordEncriptada = await bcrypt.hash(req.body.pss, salt);
  
  const usuarioExistente = await Usuario.findOne({ where: { eMail: usuario }});
 


  if (!usuarioExistente){
  nuevoUsuario = await Usuario.create({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    eMail: req.body.eMail,
    dni:req.body.dni,
    password:passwordEncriptada,
    habilitado:1,
    rol:"Profesor"})
  }else{
    var error = {error:"Usuario Existente"}
    console.log("El else de Usuario Existente: ")
  }
  
  if (error) res.render('./altaprofesor', error);
  else  res.redirect('../coordinadores/principalCoordinadores');
}; 

 

