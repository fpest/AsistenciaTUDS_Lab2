const bcrypt = require("bcrypt");
const express = require("express");
var mysql = require('mysql2');
var autenticado = require("../middleware/autenticar");
var fechaHoy = require("../middleware/fecha");
var fechaArg = require("../middleware/fechaArg");
const Materia = require("../models").Materia;
const GestionHorarioView = require("../models").GestionHorarioView;
const { Op, INTEGER } = require("sequelize");
const diasemana = require("../middleware/semana");
const GestionHorario = require("../models").GestionHorario;
const Horario = require("../models").Horario;
const Horarioview = require("../models").Horarioview;
const moment = require('moment')
const { sequelize, Sequelize } = require('../models');
const { QueryTypes } = require('sequelize');


exports.calendarioprofesor = async function (req, res) {
  console.log("Dentro de Calendario Profesor...---")
  var idMateria = req.params.idMateria
  let listahorarioview = []
  var calendario = []
  var chv = new Horarioview
  const materia = await Materia.findOne({ where: {idMateria: idMateria}})
  const listahorario = await Horario.findAll({
    where: { idMateria: idMateria },
  });
  

  listahorario.forEach(ch => {
    var diahora = ch.diaHoraInicio
    var durac = ch.duracion

    var mes = diahora.getMonth()+1
    var dia = ("0" + diahora.getUTCDate()).slice(-2)
    var year = diahora.getFullYear()

    var fechaenvio = dia + "-" + mes + "-" + year
    let hview = {
    "id" : ch.id,
    "diaHoraInicio" : fechaenvio,
    "duracion" : ch.duracion,
    "seDicta" : ch.seDicta,
    "idMateria" : ch.idMateria,
    "idDicta" : ch.idDicta,
    "periodoMateria" : ch.periodoMateria,
    "diasemana" : diasemana(ch.diaHoraInicio),
    "horainicio" : diahora.getHours() + 3,
    "horafin": diahora.getHours() + 3 + durac
    }


    calendario = listahorarioview.push(hview)

    



    
  });
  console.log("viene calendario")
  console.log(listahorarioview)
  var hoy = fechaHoy();
  return res.render("./calendarioprofesor", {hoy: hoy, materia: materia, calendario: listahorarioview });


  }




exports.registroHorario = async function (req, res) {
  var idMateria = req.params.idMateria
  var diasemanainicio = [8,8,8,8,8]
  var diasemanaduracion = [0,0,0,0,0]

  diasemanainicio[0] = req.body.lunesinicio
  diasemanainicio[1] = req.body.martesinicio
  diasemanainicio[2] = req.body.miercolesinicio
  diasemanainicio[3] = req.body.juevesinicio
  diasemanainicio[4] = req.body.viernesinicio
  
  diasemanaduracion[0] = req.body.lunesduracion
  diasemanaduracion[1] = req.body.martesduracion
  diasemanaduracion[2] = req.body.miercolesduracion
  diasemanaduracion[3] = req.body.juevesduracion
  diasemanaduracion[4] = req.body.viernesduracion
  
  
  
  console.log("para registra horarios")

  for (let i=0; i<5 ; i++){
    switch (i){
      case 0: dia = "Lunes"
              break;
      case 1: dia = "Martes"
              break;
      case 2: dia = "Miercoles"
              break;
      case 3: dia = "Jueves"
              break;
      case 4: dia = "Viernes"
              break;
    }
    const cantgestionhorario = await GestionHorario.count({
      where: { idMateria: idMateria, diaSemana: dia },
    });
    if (cantgestionhorario>0){

      const dicta = await GestionHorario.update({
        horaInicio: diasemanainicio[i], duracion: diasemanaduracion[i] 
    }, {
        where: {
            idMateria: idMateria, diaSemana: dia
        }
    });
         
    }
    else{
    const nuevaGestionHorario = await GestionHorario.create({
      idMateria: idMateria,
      diaSemana: dia,
      horaInicio: diasemanainicio[i],
      duracion: diasemanaduracion[i]
  })
  .catch((err) =>{
    var mensaje = "No se pudo Registrar"
    return res.render("./altamateria", {mensaje: mensaje, hoy: hoy });  
  });
}
}
const materia = await Materia.findOne({ where: {idMateria: idMateria}})




// Ahora generamos Calendario

/* Esto estaba en al anterior 
  var diaHorario = ["Lunes","Martes","Miercoles","Jueves","Viernes"]
  var iniHorario = [8,8,8,8,8]
  var durHorario = [0,0,0,0,0]
*/


let diaHorario = []
let iniHorario = []
let durHorario = []
  const listaGestionHorario = await GestionHorario.findAll({ where: {idMateria: idMateria}})

  // En estos arreglos tenemos los dias de la semana y sus horarios
  var i=0
  listaGestionHorario.forEach(e => {

    diaHorario.push(e.diaSemana)
    iniHorario.push(e.horaInicio)
    durHorario.push(e.duracion)
    

/*
    diaHorario[i]= e.diaSemana
    iniHorario[i]= e.horaInicio
    durHorario[i]= e.duracion
    i ++
  */
  
    
    console.log("dias de la semana dentro foreach")
  
    console.log(diaHorario[i])
    console.log(iniHorario[i])
    console.log(durHorario[i])
  
  i++
  });



  
var fechainicio = materia.fechaInicioCursada
var fechafin = materia.fechaFinCursada
var periodoMateria = materia.cicloLectivo
var hoy = fechaHoy();
var nuevoHorario = new Horario

// Verificamos si ya hay calendario generado para esta materia

const cantcalendario = await Horario.count({
  where: { idMateria: idMateria },
});

// Si no hay Calendario Creamos uno nuevo
if (cantcalendario==0){

//Calculamos la cantidad de dias entre inicio y fin (no importa que el comienzo sea antes de hoy)
  var yeari = fechainicio.substring(0,4)
  var mesi = parseInt(fechainicio.substring(5,7)) - 1
  var diai = fechainicio.substring(8,11)

  var yearf = fechafin.substring(0,4)
  var mesf = parseInt(fechafin.substring(5,7)) - 1
  var diaf = fechafin.substring(8,11)

  var fechaInicio = new Date(yeari, mesi, diai).getTime();
  var fechaFin    = new Date(yearf, mesf, diaf).getTime();
  var day_as_milliseconds = 86400000;
  var diff_in_millisenconds = fechaFin - fechaInicio;

  var cantDiasEntreInicioyFin = diff_in_millisenconds / day_as_milliseconds;

  //con el for hacemos las fechas entre el inicio y el fin
  var diaActual = new Date(yeari, mesi, diai)

  for (let i=0; i<cantDiasEntreInicioyFin + 1; i++){
    //en diaActual están todos los dias inicio a fin de la materia

    var diaDeLaSemana = diasemana(diaActual)
    var numeroDiaDeLaSemana = diaActual.getDay();
  
    switch (numeroDiaDeLaSemana){
      case 0:
        break;
      case 1: //Lunes
        if (durHorario[0]!=0){
          diaActual.setHours(iniHorario[0]-3)
          nuevoHorario.diaHoraInicio = diaActual
          nuevoHorario.duracion = durHorario[0]
          nuevoHorario.seDicta = true
          nuevoHorario.idMateria = idMateria
          nuevoHorario.idDicta = 44
        }
        break;
      case 2: //martes
        if (durHorario[1]!=0){
          diaActual.setHours(iniHorario[1]-3)
          nuevoHorario.diaHoraInicio = diaActual
          nuevoHorario.duracion = durHorario[1]
          nuevoHorario.seDicta = true
          nuevoHorario.idMateria = idMateria
          nuevoHorario.idDicta = 44
        }
        break;
      case 3: //miercoles
        if (durHorario[2]!=0){
          diaActual.setHours(iniHorario[2]-3)
          nuevoHorario.diaHoraInicio = diaActual
          nuevoHorario.duracion = durHorario[2]
          nuevoHorario.seDicta = true
          nuevoHorario.idMateria = idMateria
          nuevoHorario.idDicta = 44
        }
        break;
      case 4: //jueves
        if (durHorario[3]!=0){
          diaActual.setHours(iniHorario[3]-3)
          nuevoHorario.diaHoraInicio = diaActual
          nuevoHorario.duracion = durHorario[3]
          nuevoHorario.seDicta = true
          nuevoHorario.idMateria = idMateria
          nuevoHorario.idDicta = 44
        }
        break;
      case 5: //viernes
        if (durHorario[4]!=0){
          diaActual.setHours(iniHorario[4]-3)
          nuevoHorario.diaHoraInicio = diaActual
          nuevoHorario.duracion = durHorario[4]
          nuevoHorario.seDicta = true
          nuevoHorario.idMateria = idMateria
          nuevoHorario.idDicta = 44
        }
        break;
      case 6:
        break;
    
    }
  
    nuevoHorario.periodoMateria = periodoMateria
 

if (nuevoHorario.duracion>0){
     
  const horario = await Horario.create({
      diaHoraInicio : nuevoHorario.diaHoraInicio,
      duracion : nuevoHorario.duracion,
      seDicta : nuevoHorario.seDicta,
      idMateria : nuevoHorario.idMateria,
      idDicta : nuevoHorario.idDicta,
      periodoMateria : nuevoHorario.periodoMateria

  })

      nuevoHorario.diaHoraInicio = undefined
      nuevoHorario.duracion = undefined
      nuevoHorario.seDicta = undefined
      nuevoHorario.idMateria = undefined
      nuevoHorario.idDicta = undefined
      nuevoHorario.periodoMateria = undefined
 
}

  diaActual.setDate(diaActual.getDate() + 1);

}

//hasta acá la creacion de calendario ahora la actualizacion si hay algun cambio
}else{




// lo viejo se deja el cambio se genera desde el dia de hoy(si es mayor a dia de inicio)
//Calculamos la cantidad de dias entre hoy y fin 

console.log("Feha Inicio y Hoy " + fechainicio + " " + hoy )

if (hoy > fechainicio) {fechainicio = hoy}


var yeari = fechainicio.substring(0,4)
var mesi = parseInt(fechainicio.substring(5,7)) - 1
var diai = fechainicio.substring(8,11)

var yearf = fechafin.substring(0,4)
var mesf = parseInt(fechafin.substring(5,7)) - 1
var diaf = fechafin.substring(8,11)

var fechaInicio = new Date(yeari, mesi, diai).getTime();
var fechaFin    = new Date(yearf, mesf, diaf).getTime();
var day_as_milliseconds = 86400000;
var diff_in_millisenconds = fechaFin - fechaInicio;

var cantDiasEntreInicioyFin = diff_in_millisenconds / day_as_milliseconds;

//con el for hacemos las fechas entre el inicio y el fin
var diaActual = new Date(yeari, mesi, diai)

const materias = await sequelize.query("DELETE FROM `horarios` WHERE idMateria = " + idMateria + " and diaHoraInicio >= '" + fechainicio +"'" , { type: QueryTypes.DELETE });




for (let i=0; i<cantDiasEntreInicioyFin + 1; i++){
  //en diaActual están todos los dias inicio a fin de la materia

  var diaDeLaSemana = diasemana(diaActual)
  var numeroDiaDeLaSemana = diaActual.getDay();

  switch (numeroDiaDeLaSemana){
    case 0:
      break;
    case 1: //Lunes
      if (durHorario[0]!=0){
        diaActual.setHours(iniHorario[0]-3)
        nuevoHorario.diaHoraInicio = diaActual
        nuevoHorario.duracion = durHorario[0]
        nuevoHorario.seDicta = true
        nuevoHorario.idMateria = idMateria
        nuevoHorario.idDicta = 44
      }
      break;
    case 2: //martes
      if (durHorario[1]!=0){
        diaActual.setHours(iniHorario[1]-3)
        nuevoHorario.diaHoraInicio = diaActual
        nuevoHorario.duracion = durHorario[1]
        nuevoHorario.seDicta = true
        nuevoHorario.idMateria = idMateria
        nuevoHorario.idDicta = 44
      }
      break;
    case 3: //miercoles
      if (durHorario[2]!=0){
        diaActual.setHours(iniHorario[2]-3)
        nuevoHorario.diaHoraInicio = diaActual
        nuevoHorario.duracion = durHorario[2]
        nuevoHorario.seDicta = true
        nuevoHorario.idMateria = idMateria
        nuevoHorario.idDicta = 44
      }
      break;
    case 4: //jueves
      if (durHorario[3]!=0){
        diaActual.setHours(iniHorario[3]-3)
        nuevoHorario.diaHoraInicio = diaActual
        nuevoHorario.duracion = durHorario[3]
        nuevoHorario.seDicta = true
        nuevoHorario.idMateria = idMateria
        nuevoHorario.idDicta = 44
      }
      break;
    case 5: //viernes
      if (durHorario[4]!=0){
        diaActual.setHours(iniHorario[4]-3)
        nuevoHorario.diaHoraInicio = diaActual
        nuevoHorario.duracion = durHorario[4]
        nuevoHorario.seDicta = true
        nuevoHorario.idMateria = idMateria
        nuevoHorario.idDicta = 44
      }
      break;
    case 6:
      break;
  
  }

  nuevoHorario.periodoMateria = periodoMateria
 
if (nuevoHorario.duracion>0){
    
const horario = await Horario.create({
    diaHoraInicio : nuevoHorario.diaHoraInicio,
    duracion : nuevoHorario.duracion,
    seDicta : nuevoHorario.seDicta,
    idMateria : nuevoHorario.idMateria,
    idDicta : nuevoHorario.idDicta,
    periodoMateria : nuevoHorario.periodoMateria

})

    nuevoHorario.diaHoraInicio = undefined
    nuevoHorario.duracion = undefined
    nuevoHorario.seDicta = undefined
    nuevoHorario.idMateria = undefined
    nuevoHorario.idDicta = undefined
    nuevoHorario.periodoMateria = undefined

}

diaActual.setDate(diaActual.getDate() + 1);

}

}
  
    
  return res.redirect("../calendarioprofesor/" + idMateria);
  }

exports.antesinsertar = async function (req, res) {
  console.log("Dentro de insertar Materias...---")
  var hoy = fechaHoy();
  return res.render("./altamateria", {hoy: hoy });
  }

  exports.dicta = async function (req, res) {
    var id = req.params.id
    var chb = req.params.controlchecked
    console.log("dentro de dicta " +id + chb)
    if (chb == "true"){chbstr = false}else{chbstr=true}

    const dicta = await Horario.update({
      seDicta: chbstr}, {
      where: {
          id: id
      }
  });


    /*const materia = await Materia.findOne({ where: {idMateria: idMateria}})
    const gestionhorarios = await GestionHorario.findAll({
      where: { idMateria: idMateria },
    });
    
  
    var hoy = fechaHoy();
    return res.render("./gestionHorario", {hoy: hoy, materia: materia, gestionhorarios: gestionhorarios });
  */
    res.redirect('back');  
  
  }




  

exports.gestionHorario = async function (req, res) {
  var idMateria = req.params.idMateria
  const materia = await Materia.findOne({ where: {idMateria: idMateria}})
  const gestionhorarios = await GestionHorario.findAll({
    where: { idMateria: idMateria },
  });
  

  var hoy = fechaHoy();
  return res.render("./gestionHorario", {hoy: hoy, materia: materia, gestionhorarios: gestionhorarios });
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




