const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
const { Op } = require("sequelize");

const Usuario = require("../models").Usuario;



exports.insertar = async function (req, res) {
    console.log("Dentro de insertar")
    var estado=""
    var perfil = ""
    const usuarios = await Usuario.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        user: req.body.user,
        pss:req.body.pss,
        rol:"Alumno"
      })
      res.redirect('/');
    
    }
  
    exports.registrarse = async function (req, res) {
      console.log("Registrarse")  
      return res.render('./registrarse')
  }

  exports.insertarRegistro = async function (req, res) {
    var rol = ""
    var passwordEncriptada
    var nuevoUsuario
    const usuario = req.body.eMail
    const salt = await bcrypt.genSalt(10);
    passwordEncriptada = await bcrypt.hash(req.body.pss, salt);
    
    const usuarioExistente = await Usuario.findOne({ where: { eMail: usuario }});
   


    //const usuarioExistente = await Usuario.findOne({ where: {[Op.and]: [{ eMail: usuario  }, { habilitado: true }]}});
 
  

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
  }; 


