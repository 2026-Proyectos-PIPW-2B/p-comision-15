import { obtener, eliminar, guardar, obtenerSesion } from "./modulos/gestorStorage.js";
import { validarDatos as validacion, verificarSesion } from './modulos/gestorUsuarios.js'

const bodyTabla = document.getElementById("bodyTabla");
const USUARIO_KEY = "usuarios";

window.addEventListener('DOMContentLoaded', inicializar)

function inicializar(){
      mostrarUsuariosRegistrados();
      agregarListenerBotones();
      verificarTiempoSesion();
  }

function agregarListenerBotones(){
    const botonValidar = document.getElementById("botonValidar");
    const NOMBRES_USUARIOS = document.getElementById("nombresUsuarios");

    botonValidar.addEventListener("click", creacionDeUsuarios);
    if(NOMBRES_USUARIOS){
    NOMBRES_USUARIOS.addEventListener("click", ordenarAlfabeticamente); }
}

function creacionDeUsuarios() {
  const nombreCrear = document.getElementById("inputCrearNombre");
  const contraseñaCrear = document.getElementById("inputCrearContraseña");
  const inputEstado = document.getElementById("inputEstado");
  const inputRol = document.getElementById("inputRol");

  const nombre = nombreCrear.value;
  const contraseña = contraseñaCrear.value;
  const estado = inputEstado.value;
  const rol = inputRol.value;

  validacion(nombre, contraseña, estado, rol);
}

function mostrarUsuariosRegistrados() {
   const usuarios = obtener(USUARIO_KEY) || [] 
   let usuario;
   
  bodyTabla.innerHTML = "";
    for (let i = 0; i < usuarios.length; i++) {
    usuario = usuarios[i]
    agregarFilaEnTabla(usuario)
     }
}

function agregarFilaEnTabla(usuario) {
  const fila = document.createElement("tr");

  const col_1 = document.createElement("td");
  const col_2 = document.createElement("td");
  const col_3 = document.createElement("td");
  const col_4 = document.createElement("td");
  const col_5 = document.createElement("td");
  const col_6 = document.createElement("td");
  const col_7 = document.createElement("td");

  col_1.textContent = usuario.nombre;
  col_2.textContent = usuario.contraseña;
  col_3.textContent = usuario.estado;
  col_4.textContent = usuario.rol;
  col_5.innerHTML = '<Button class="btn btn-success mx-2" id="botonHabilitar" ><i class="bi bi-check-square"></i></Button>'
  col_6.innerHTML = '<Button class="btn btn-danger mx-2" id="botonDeshabilitar" ><i class="bi bi-ban"></i></Button>'
  col_7.innerHTML = '<Button class="btn btn-info mx-2" id="botonEditar"><i class="bi bi-clipboard-x"></i></Button>'

  fila.appendChild(col_1);
  fila.appendChild(col_2);
  fila.appendChild(col_3);
  fila.appendChild(col_4);
  fila.appendChild(col_5);
  fila.appendChild(col_6);
  fila.appendChild(col_7);

  bodyTabla.appendChild(fila);
}

 function ordenarAlfabeticamente (){
  const usuarios = obtener(USUARIO_KEY);
  usuarios.sort((a, b) => a.nombre.localeCompare(b.nombre));
  guardar(USUARIO_KEY, usuarios)
  mostrarUsuariosRegistrados()
}

function verificarTiempoSesion(){
  const expiracion = obtenerSesion('tiempoExpiracion')
  const tiempoActual = new Date().getTime();
  const tiempoSesion = setInterval(verificarTiempoSesion, 5000);

  if ((tiempoActual > expiracion)){
    eliminar('sesion');
    eliminar('tiempoExpiracion');
    clearInterval(tiempoSesion);
    window.location.href = '../inicio.html'
  }
}
