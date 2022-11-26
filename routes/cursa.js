var express = require("express");
var router = express.Router();
var cursaController = require("../controllers/cursa");

router.get(`/pedidoinscripcion/:idMateria/:idUsuario`, cursaController.pedidoinscripcion)
router.get(`/validarinscripcion/`, cursaController.validarinscripcion)
router.get(`/estadoinscripcion/:idMateria/:idUsuario/:estado`, cursaController.estadoinscripcion)

module.exports = router;
