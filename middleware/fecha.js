function fechaHoy(){
    var fecha = new Date()
    var mesSumado = fecha.getMonth()+1
    var mes = ("0" + mesSumado).slice(-2) 
    var dia = ("0" + fecha.getUTCDate()).slice(-2)
    var year = fecha.getFullYear()
    var hoy = year + "-" + mes + "-" + dia
    console.log(hoy)
    return hoy
  }
  
  function fechaArg(fechaEEUU){
  var year = fechaEEUU.substring(0,4)
  var mes = fechaEEUU.substring(5,7)
  var dia = fechaEEUU.substring(8,11)
  argFecha = dia + "-" + mes + "-" + year
  console.log(fechaEEUU + " " + dia + "-" + mes + "-" + year)
  return argFecha
  
  }

  function diasemana(fechaComoCadena){
console.log(fechaComoCadena)
    const dias = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    const numeroDia = new Date(fechaComoCadena).getDay();
    const nombreDia = dias[numeroDia];
 
    console.log("Nombre de día de la semana: ", nombreDia);
   


  }

  module.exports = fechaHoy;
  