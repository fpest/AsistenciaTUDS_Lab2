var express = require("express");
var router = express.Router();
var alumnosController = require("../controllers/alumnos");



router.get("/principalAlumnos", alumnosController.principalAlumnos)



module.exports = router;
