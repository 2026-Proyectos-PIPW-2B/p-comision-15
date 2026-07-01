import{guardar, obtener, eliminarTodo, eliminar, iniciarConteoSesion, obtenerSesion} from './gestorStorage.js'

const usuario_sesion = 'usuario'
const admin_sesion = 'admin'
const USUARIO_KEY="usuarios";
const urlInicio = 'index.html'
const urlAdmin = 'admUsuarios.html'
 
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

 export function agregarUsuarioLocalStorage(usuario) {
  const usuarios = obtener(USUARIO_KEY) || [];
  usuarios.push(usuario)
  guardar("usuarios", usuarios)
}

function validarInicioSesion(nombreUsuario, contraseñaUsuario){
  const usuarios = obtenerUsuarios()
  let contieneNombre = false
  let contieneContraseña = false
  let usuarioValido = false

 
  for (let i = 0; i<usuarios.length; i++){
    if(usuarios[i].nombre === nombreUsuario){
      contieneNombre = true
      idNombre= usuarios[i].id
      break;
    }}
  for (let i = 0; i<usuarios.length; i++){
    if(usuarios[i].contraseña === contraseñaUsuario ){
      contieneContraseña = true
      idContraseña = usuarios[i].id
      break;
    }}
    if(idNombre === idContraseña){
      if ( obtenerUsuario(idNombre).rol === 'habilitado'){
          usuarioValido = true
      }
    }
      return(usuarioValido)
}

export function inicioSesion(nombre, contraseña) {
  let encontrado = false;
  const usuariosDelArray = obtener(USUARIO_KEY)

  for (let i = 0; i <= usuariosDelArray.length - 1; i++) {
    if (nombre === usuariosDelArray[i].nombre && contraseña === usuariosDelArray[i].contraseña) {   
      let usuario = usuariosDelArray[i]
          if(usuario.rol === 'admin'){            
             verificarAdminYRedirigir(usuario)
            }else{
             verificarUsuarioYRedirigir(usuario)
            }
      encontrado = true;
      break;
    }
  }
  encontrado = false;
}

function verificarUsuarioYRedirigir (usuario){
      if (usuario.rol === 'usuario'){
          iniciarConteoSesion(usuario_sesion)
          location.reload()
  }
}

function verificarAdminYRedirigir(usuario) {
  if (usuario.rol === admin_sesion) {
    iniciarConteoSesion(admin_sesion)
    window.location.href = urlAdmin
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
      eliminar('productosComprados')
      window.location.href = urlInicio
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
export  function buscarUsuario(nombreUsuario){
  const usuarios = obtenerUsuarios()
  let contieneNombre = false
  let idNombre;
  let errores;
  
  for (let i = 0; i<usuarios.length; i++){
    if(usuarios[i].nombre === nombreUsuario){
      contieneNombre = true
      idNombre = usuarios[i].id
      break;
    }}
  return {contieneNombre, idNombre}
  }  

export  function buscarContraseña (contraseñaUsuario){
      const usuarios = obtenerUsuarios()
      let contieneContraseña = false
      let idContraseña

    for (let i = 0; i<usuarios.length; i++){
    if(usuarios[i].contraseña === contraseñaUsuario ){
      contieneContraseña = true
      idContraseña = usuarios[i].id
      break;
    }}
        return {contieneContraseña, idContraseña}
}

