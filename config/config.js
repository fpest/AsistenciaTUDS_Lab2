const {Sequelize} = require("sequelize") ;
var mysql = require("mysql2");

var hostname = "localhost";
var port = "3306";
console.log("Llegamos al config")
const config = new Sequelize('proyecto1', 'root', '',{
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

module.exports = config;
