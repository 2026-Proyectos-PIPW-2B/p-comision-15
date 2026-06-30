import {inicioSesion, verificarSesion, cerrarSesion, obtenerUsuarios, obtenerUsuario, buscarContraseña, buscarUsuario } from './modulos/gestorUsuarios.js'

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
  let contraseñaValida
  let usuarioValido = buscarUsuario(nombreUsuario).contieneNombre


  if (validator.isEmpty(nombreUsuario) || validator.isEmpty(contraseñaUsuario)) {
     mostrarError("Todos los campos son obligatorios.");
        return;}    

     if (buscarUsuario(nombreUsuario).contieneNombre ===true){
      usuarioValido = buscarUsuario(nombreUsuario).idNombre
      if((buscarUsuario(nombreUsuario).idNombre === buscarContraseña(contraseñaUsuario).idContraseña) && buscarContraseña(contraseñaUsuario).contieneContraseña){
         contraseñaValida = buscarContraseña(contraseñaUsuario).idContraseña
     }  else{
       mostrarError('La contraseña es incorrecta')
      return;
     }}else{
       mostrarError('El usuario ingresado no esta registrado')
       return;
     }

      if(usuarioValido === contraseñaValida && obtenerUsuario(usuarioValido).estado === 'habilitado'){
        inicioSesion(nombreUsuario, contraseñaUsuario)
      }else{
        mostrarError('El usuario esta deshabilitado ')
      }
      
     }

function mostrarError(mensaje) {
    document.getElementById('mensajesError').textContent = mensaje;
} 

function sesionIniciada (){
  const iconoDesconexion = document.getElementById('iconoDesconexion');
  const iconoConexion = document.getElementById('iconoConexion')
  const desconexion = document.getElementById('desconexion');

  if (verificarSesion() === true){
       iconoDesconexion.style.display = 'inline-block'
      iconoConexion.style.display = 'none'
  }else{
    iconoDesconexion.style.display = 'none';
    iconoConexion.style.display ='inline-block';
  }
}

function redirigirAlCarrito (){
  if(verificarSesion()){
    window.location.href = 'carrito.html'
  }
}
