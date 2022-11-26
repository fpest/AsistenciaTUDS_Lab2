 
  function fechaArg(fechaEEUU){
  var year = fechaEEUU.substring(0,4)
  var mes = fechaEEUU.substring(5,7)
  var dia = fechaEEUU.substring(8,11)
  argFecha = dia + "-" + mes + "-" + year
  console.log(fechaEEUU + " " + dia + "-" + mes + "-" + year)
  return argFecha
  
  }


  module.exports = fechaArg;
  