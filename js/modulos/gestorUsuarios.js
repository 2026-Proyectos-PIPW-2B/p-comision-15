import{guardar, obtener, eliminarTodo, eliminar, iniciarConteoSesion, obtenerSesion} from './gestorStorage.js'

const usuario_sesion = 'usuario'
const admin_sesion = 'admin'
const USUARIO_KEY="usuarios";
 
export function validarDatos(nombre, contraseña, estado, rol) {
  const divValidacion = document.getElementById("divValidacion");
  const validacion = validarUsuario(nombre, contraseña);

  if (validacion === true) {
    agregarUsuarioLocalStorage(crearUsuario(nombre, contraseña, estado, rol));
    mostrarMovimiento();
  }
}

function validarUsuario(nombre, contraseña, estado, rol) {
  const cuenta = { resultado: true, fallos: [] };
  if (nombre.length < 4) {
    cuenta["resultado"] = false;
    cuenta.fallos.push("El nombre de usuario debe tener al menos 4 letras ");
  }
  if (contraseña.length < 4 || contraseña.length > 10) {
    cuenta["resultado"] = false;
    cuenta.fallos.push(
      "La contraseña del usuario debe tener entre 4 y 10 caracteres",
    );
  }
  return cuenta.resultado;
}

function crearUsuario(nombreUsuario, contraseña, estado, rol) {
   const id = crypto.randomUUID();
  const usuario = {
    id: id,
    nombre: nombreUsuario,
    contraseña: contraseña,
    estado: estado,
    rol: rol,
  };
  return usuario;
}

 function agregarUsuarioLocalStorage(usuario) {
  const usuarios = obtener(USUARIO_KEY) || [];
  usuarios.push(usuario)
  guardar("usuarios", usuarios)
}

export function inicioSesion(nombre, contraseña, urlActual) {
  let encontrado = false;
  const usuariosDelArray = obtener(USUARIO_KEY)

  for (let i = 0; i <= usuariosDelArray.length - 1; i++) {
    if (
      nombre === usuariosDelArray[i].nombre &&
      contraseña === usuariosDelArray[i].contraseña
    ) {               
       verificarAdminYRedirigir(usuariosDelArray[i], 'admUsuarios.html')
      encontrado = true;
      break;
    }else{
      verificarAdminYRedirigir(usuariosDelArray[i], urlActual)
    }
  }
  encontrado = false;
}

function verificarAdminYRedirigir(usuario, urlDestino) {
  if (usuario.rol === admin_sesion) {
    iniciarConteoSesion(admin_sesion)
    window.location.href = urlDestino;
  }else{
    iniciarConteoSesion(usuario_sesion)

  }
}

export function verificarSesion(){
  let logueado = true;
  const sesionIniciada = obtenerSesion('sesion')
  if (!sesionIniciada){
    logueado = false
  }
  return logueado;
}
export function cerrarSesion(){
      eliminar('sesion');
      eliminar('tiempoExpiracion');
      window.location.href = '../inicio.html'
}

export function obtenerUsuarios() {
  const usuarios = obtener(USUARIO_KEY) || [];
  return usuarios;
}

export function obtenerUsuario(id){
  let retorno = null
  const usuarios = obtenerUsuarios()

  for(let i = 0; i < usuarios.length && retorno == null; i++){
    if (usuarios[i].id == id){
      retorno = usuarios[i]
    }
  }
  return retorno
}

export  function obtenerPosicion (id){
  let pos = 0;
  const usuarios = obtener(USUARIO_KEY)
  for (let i=0; i<usuarios.length; i++){
    if (usuarios[i].id == id){
      pos = i
    }
  }
  return pos;
}
