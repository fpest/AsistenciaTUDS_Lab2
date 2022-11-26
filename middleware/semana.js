  function diasemana(fechaComoCadena){
console.log(fechaComoCadena)
    const dias = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      
    ];
    const numeroDia = new Date(fechaComoCadena).getDay();
    const nombreDia = dias[numeroDia];


 return nombreDia


  }

 module.exports = diasemana;
  