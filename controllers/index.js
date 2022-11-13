const index = require("../models").index;


exports.login = async function (req, res) {
      const mensaje= req.session.mensaje ?? '' 
      req.session.mensaje = ''
      res.render("./index", {mensaje: mensaje});
};

