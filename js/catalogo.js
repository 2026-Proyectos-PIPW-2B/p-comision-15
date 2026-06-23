import {inicioSesion, verificarSesion } from './modulos/gestorUsuarios.js'

const urlActual = 'catalogo.html';
window.addEventListener('DOMContentLoaded', inicializar)

function inicializar(){
     iniciarInputs()
  }
function iniciarInputs(){
  const botonSesion = document.getElementById("botonSesion");
    botonSesion.addEventListener("click", obtenerDatos);
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
