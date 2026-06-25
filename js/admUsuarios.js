import { obtener, eliminar, guardar, obtenerSesion } from "./modulos/gestorStorage.js";
import { obtenerUsuario, validarDatos as validacion, verificarSesion, obtenerUsuarios, cerrarSesion, obtenerPosicion } from './modulos/gestorUsuarios.js'

const bodyTabla = document.getElementById("bodyTabla");
const USUARIO_KEY = "usuarios";

const inputEditarNombre = document.getElementById("inputEditarNombre");
const inputEditarContraseña = document.getElementById("inputEditarContraseña");
const inputEditarEstado = document.getElementById("inputEditarEstado");
const inputEditarRol = document.getElementById('inputEditarRol')
let usuarioSeleccionado;

window.addEventListener('DOMContentLoaded', inicializar)

function inicializar(){
      mostrarUsuariosRegistrados();
      agregarListenerBotones();

      if (verificarSesion()===true){
           verificarTiempoSesion();
          }
  }

function agregarListenerBotones(){
    const botonValidar = document.getElementById("botonValidar");
    const NOMBRES_USUARIOS = document.getElementById("nombresUsuarios");
     const botonEditarUsuarios = document.getElementById('botonEditarUsuarios')

    botonValidar.addEventListener("click", creacionDeUsuarios);
    NOMBRES_USUARIOS.addEventListener("click", ordenarAlfabeticamente);
    botonEditarUsuarios.addEventListener('click',actualizarUsuario);
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

function verificarTiempoSesion(){
  const expiracion = obtenerSesion('tiempoExpiracion')
  const tiempoActual = new Date().getTime();
  const tiempoSesion = setInterval(verificarTiempoSesion, 5000);

  if ((tiempoActual > expiracion)){
    cerrarSesion()
    clearInterval(tiempoSesion);
  }
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

  const btn_habilitar = crearBotonAccion('habilitar');
  btn_habilitar.addEventListener("click", function () {
  ejecutarHabilitarUsuario(usuario.id);
  });

  const btn_deshabilitar = crearBotonAccion("deshabilitar");
  btn_deshabilitar.addEventListener("click", function () {
    ejecutarDeshabilitarUsuario(usuario.id);
  });


  const btn_editar = crearBotonAccion("editar");
  btn_editar.addEventListener("click", function () {
    ejecutarEditarUsuario(usuario.id);
  });

  col_1.textContent = usuario.nombre;
  col_2.textContent = usuario.contraseña;
  col_3.textContent = usuario.estado;
  col_4.textContent = usuario.rol;
  col_5.appendChild(btn_habilitar);
  col_6.appendChild(btn_deshabilitar);
  col_7.appendChild(btn_editar);

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

function ejecutarEditarUsuario(id) {
  const usuario = obtenerUsuario(id);

  inputEditarNombre.value =  usuario.nombre
  inputEditarEstado.value = usuario.estado       
  inputEditarRol.value = usuario.rol     
  usuarioSeleccionado = usuario
}

function actualizarUsuario(){
const usuarios = obtener(USUARIO_KEY)
let posicionDelUsuario = obtenerPosicion(usuarioSeleccionado.id);

 usuarios[posicionDelUsuario].nombre = inputEditarNombre.value
 usuarios[posicionDelUsuario].contraseña = inputEditarContraseña.value
 usuarios[posicionDelUsuario].estado = inputEditarEstado.value     
 usuarios[posicionDelUsuario].rol    = inputEditarRol.value   

 guardar(USUARIO_KEY,usuarios)
 mostrarUsuariosRegistrados()
}

function ejecutarDeshabilitarUsuario(id) {
  let usuarios = obtener(USUARIO_KEY)
  let posicionDelUsuario = obtenerPosicion(id)
  usuarios[posicionDelUsuario].estado = 'deshabilitado'

 guardar(USUARIO_KEY,usuarios)
 mostrarUsuariosRegistrados()

}
function ejecutarHabilitarUsuario(id){
  let usuarios = obtener(USUARIO_KEY)
  let posicionDelUsuario = obtenerPosicion(id)
  usuarios[posicionDelUsuario].estado = 'habilitado'
  
   guardar(USUARIO_KEY,usuarios)
   mostrarUsuariosRegistrados()
}

function crearBotonAccion(textoBoton) {
  const btn = document.createElement("button");
   btn.classList.add('btn')
    btn.setAttribute("type", "button");
  if(textoBoton === 'editar'){
  btn.classList.add("btn-info")
   btn.innerHTML ='<i class="bi bi-clipboard-x"></i>'
  btn.setAttribute('data-bs-target',"#editarUsuario")
  btn.setAttribute('data-bs-toggle',"modal")
  }
  if(textoBoton === 'habilitar'){
     btn.classList.add("btn-success")
     btn.innerHTML = '<i class="bi bi-check-square"></i>'
  }

  if(textoBoton === 'deshabilitar'){
    btn.classList.add("btn-danger")
    btn.innerHTML = '<i class="bi bi-ban"></i>' 

  }
  return btn
}