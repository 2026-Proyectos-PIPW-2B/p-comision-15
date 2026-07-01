import {obtener,guardar } from './modulos/gestorStorage.js'
import {inicioSesion, verificarSesion, cerrarSesion, obtenerUsuarios, obtenerUsuario, buscarContraseña, buscarUsuario,agregarUsuarioLocalStorage  } from './modulos/gestorUsuarios.js'
import { agregarProducto } from './modulos/gestorProductos.js'
window.addEventListener('DOMContentLoaded', inicializar)

function inicializar(){
     iniciarInputs()
     sesionIniciada()
  }

function iniciarInputs(){
  const botonDesconexion = document.getElementById("botonDesconexion")
  const botonSesion = document.getElementById("botonSesion");
  const botonCarrito = document.getElementById('botonCarrito');
  const botonPrecargar = document.getElementById('botonPrecargar')

  botonSesion.addEventListener("click", obtenerDatos);
  botonDesconexion.addEventListener('click',cerrarSesion);
  botonCarrito.addEventListener('click',redirigirAlCarrito);
  botonPrecargar.addEventListener('click',cargarInfomacion)
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

function cargarInfomacion(){
  const img1 = document.createElement('img')  
  const id = crypto.randomUUID();
  let link = './img/apple-logo.png'
  img1.classList.add('card-img')
  

  const listadoProductos = obtener('productos') || []

  const administrador = {id, nombre:'administrador', contraseña:'administrador', estado:'habilitado', rol:'admin'}
  const usuario = {id, nombre:'usuario', contraseña:'usuario', estado:'habilitado', rol:'usuario'}
     img1.setAttribute('src', './img/Apple-logo.png');
      const producto1 = {
      id: id,
      nombre: 'monitor ASUS 24"',
      categoria: 'celulares',
      marca: 'iphone',
      precio: 2500000,
      stock: 15,
      img: 'Iphone17-promax.png',
    };
     const producto3 = {
    id: id,
    nombre:'monitor ASUS 24"',
    categoria:'monitor',
    marca:'asus',
    precio:3500000,
    stock:15,
    img:'monitor-asus.png',};
     
    const producto2 = {
    id: id,
    nombre: 'Teclado ASUS ',
    categoria: 'periferico',
    marca: 'asus',
    precio: 1500000,
    stock: 15,
    img: 'Asus-ProArt.png',};

  guardar()

  listadoProductos.push(producto1,producto2,producto3)
  agregarUsuarioLocalStorage(administrador)
  agregarUsuarioLocalStorage(usuario)
  guardar('productos',listadoProductos)
 // agregarProducto(producto2)
 // agregarProducto(producto3)
}