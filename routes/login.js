var express = require("express");
var router = express.Router();
var loginController = require("../controllers/login");

router.post("/login", loginController.login);
router.get("/logout", loginController.logout);


module.exports = router;
