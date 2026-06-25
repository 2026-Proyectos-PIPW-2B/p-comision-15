
import {inicioSesion, verificarSesion, cerrarSesion } from './modulos/gestorUsuarios.js'

const urlActual = 'inicio.html'
window.addEventListener('DOMContentLoaded', inicializar)

function inicializar(){
     iniciarInputs()
     sesionIniciada()
  }

function iniciarInputs(){
  const botonDesconexion = document.getElementById("botonDesconexion")
  const botonSesion = document.getElementById("botonSesion");
  const botonCarrito = document.getElementById('botonCarrito');

  botonSesion.addEventListener("click", obtenerDatos);
  botonDesconexion.addEventListener('click',cerrarSesion);
  botonCarrito.addEventListener('click',redirigirAlCarrito);
}

function obtenerDatos(){
  const nombreUsuario = document.getElementById("FloatInputNombre").value
  const contraseñaUsuario = document.getElementById("FloatInputContraseña").value

  if (validator.isEmpty(nombreUsuario) || validator.isEmpty(contraseñaUsuario)) {
     mostrarError("Todos los campos son obligatorios.");
        return;}
  inicioSesion(nombreUsuario, contraseñaUsuario, urlActual)
    }

function mostrarError(mensaje) {
    document.getElementById('mensajesError').textContent = mensaje;
} 


function sesionIniciada (){
  const iconoDesconexion = document.getElementById('iconoDesconexion');
  const desconexion = document.getElementById('desconexion');

  if (verificarSesion() === true){
     iconoDesconexion.style.display = 'inline-block';
  }else{
    iconoDesconexion.style.display = 'none';
  }
}

function redirigirAlCarrito (){
  if(verificarSesion()){
    window.location.href = 'carrito.html'
  }
}


