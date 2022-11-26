var express = require("express");
var router = express.Router();
var materiasController = require("../controllers/materias");




router.get("/antesinsertar", materiasController.antesinsertar)
router.post("/insertarRegistroMateria", materiasController.insertarRegistroMateria)
router.get("/gestionHorario/:idMateria", materiasController.gestionHorario)
router.post("/registroHorario/:idMateria", materiasController.registroHorario)
router.get("/calendarioprofesor/:idMateria", materiasController.calendarioprofesor)
router.get("/dicta/:id/:controlchecked", materiasController.dicta)



module.exports = router;
