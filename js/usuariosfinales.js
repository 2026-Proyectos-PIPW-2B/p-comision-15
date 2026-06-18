import {inicioSesion } from './usuarios.js'

window.addEventListener("load", function(){
    inicializacion();
})

function inicializacion(){
     const botonValidar = document.getElementById("botonSesion");
      if (botonSesion) {
    botonSesion.addEventListener("click", inicioSesion);
  }
}