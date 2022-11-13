var express = require("express");
var router = express.Router();
var profesoresController = require("../controllers/profesores");



router.get("/principalProfesores", profesoresController.principalProfesores)



module.exports = router;
