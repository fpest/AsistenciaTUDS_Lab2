const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
const Usuario = require("../models").Usuario;
const { Op } = require("sequelize");



exports.logout = function (req, res) {
  console.log("en logout")
  req.session.mensaje = ""
  req.session.destroy();
  res.redirect('/');
}

exports.login = async function (req, res) {

  var validPassword
  req.session.mensaje = ''
  const usuario = req.body.eMail
  const password = req.body.password


  console.log("Deberia aparecer aqui")

  console.log(usuario)
  console.log(password)
  console.log(usuario && password)

  if (!(usuario && password)) {
    req.session.mensaje = "Se debe ingresar Usuario y Password.";
    return res.status(400).redirect("/");
  }

  

 const user = await Usuario.findOne({ where: {[Op.and]: [{ eMail: usuario  }]}});
 console.log("esto es importante")
  console.log(user)
  
  
  if (user) {

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      req.session.user = user.eMail;
      req.session.usuarioCompleto = user;
      req.session.usuarioId = user.id;
      const rol = user.rol
     // req.session.usuarioPerfil = user.perfil;
      req.session.mensaje = "Todo Perfecto";
      console.log("Rol: " + rol)
      switch (rol){
        case 'Coordinador':
          return res.redirect("/coordinadores/principalCoordinadores");
          break;
        case 'Profesor':
          return res.redirect("/profesores/principalProfesores");
          break;
        case 'Alumno':
          return res.redirect("/alumnos/principalAlumnos");  
          break;
        default:
          return res.redirect("/alumnos/principalAlumnos");  

      }        
      
  
     } else {
      req.session.mensaje = "Usuario o Password incorrecto.";
      return res.status(400).redirect("/");
    }
    
  }else{
  req.session.mensaje = "Usuario o Password incorrecto.";
    return res.status(200).redirect("/");
  }
  
 // res.render("./principal", { usuario: usuario, password: password });
};

 

