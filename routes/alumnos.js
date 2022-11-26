var express = require("express");
var router = express.Router();
var alumnosController = require("../controllers/alumnos");



router.get("/principalAlumnos", alumnosController.principalAlumnos)
router.get(`/asistenciaalumno`, alumnosController.asistenciaalumno)



module.exports = router;
