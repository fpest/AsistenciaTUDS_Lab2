var express = require("express");
var router = express.Router();
var dictaController = require("../controllers/dicta");

router.get(`/acargo/:id/:idUsuario/:controlchecked`, dictaController.acargo)



module.exports = router;
