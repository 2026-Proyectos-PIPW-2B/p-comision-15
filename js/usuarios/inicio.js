
import {inicioSesion } from './usuarios.js'

const urlActual = 'inicio.html'

inicializacion()


function inicializacion(){
     const botonSesion = document.getElementById("botonSesion");
      if (botonSesion) {
    botonSesion.addEventListener("click", obtenerDatos);
  }
}

function obtenerDatos(){
  const nombreUsuario = document.getElementById("FloatInputNombre").value
  const contraseñaUsuario = document.getElementById("FloatInputContraseña").value

  if (validator.isEmpty(nombreUsuario) || validator.isEmpty(contraseñaUsuario)) {
     mostrarError("Todos los campos son obligatorios.");
        return;

        }
  inicioSesion(nombreUsuario, contraseñaUsuario, urlActual)
    }


function mostrarError(mensaje) {
    document.getElementById('mensajesError').textContent = mensaje;
} 
