var express = require("express");
var router = express.Router();
var coordinadoresController = require("../controllers/coordinadores");



router.get("/principalCoordinadores", coordinadoresController.principalCoordinadores)



module.exports = router;
