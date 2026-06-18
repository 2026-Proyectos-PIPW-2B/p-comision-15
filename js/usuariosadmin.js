
 import {validarDatos as validacion} from './usuarios.js'

window.addEventListener("load", function(){
    inicializacion();
    console.log("123456")
})
function inicializacion(){
     const botonValidar = document.getElementById("botonValidar");
      if (botonValidar) {
    botonValidar.addEventListener("click", validacion);
  }
}

