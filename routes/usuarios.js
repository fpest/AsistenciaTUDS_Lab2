var express = require("express");
var router = express.Router();
var usuariosController = require("../controllers/usuarios");


router.post("/insertar", usuariosController.insertar);
router.post("/insertarRegistro", usuariosController.insertarRegistro);
router.get("/registrarse", usuariosController.registrarse);


module.exports = router;