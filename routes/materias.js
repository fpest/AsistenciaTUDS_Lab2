var express = require("express");
var router = express.Router();
var materiasController = require("../controllers/materias");




router.get("/antesinsertar", materiasController.antesinsertar)
router.post("/insertarRegistroMateria", materiasController.insertarRegistroMateria)



module.exports = router;
