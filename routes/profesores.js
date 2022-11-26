var express = require("express");
var router = express.Router();
var profesoresController = require("../controllers/profesores");


router.get("/antesinsertar", profesoresController.antesinsertar)
router.get(`/anteseditar/:id`, profesoresController.anteseditar)
router.get("/principalProfesores", profesoresController.principalProfesores)
router.post("/insertarRegistroProfesor", profesoresController.insertarRegistroProfesor);




module.exports = router;
