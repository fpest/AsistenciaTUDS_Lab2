function isAutenticated(req, res, next) {
        if(req.session.user) { 
        next();     
    } else {         
      //  res.redirect("/principal");     
    } };

module.exports = isAutenticated;