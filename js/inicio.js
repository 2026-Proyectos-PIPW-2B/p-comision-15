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
  const listadoProductos = obtener('productos') || []

  const administrador = {id:'administrador0', nombre:'administrador', contraseña:'administrador', estado:'habilitado', rol:'admin'}
  const usuario = {id:'usuario', nombre:'usuario', contraseña:'usuario', estado:'habilitado', rol:'usuario'}
      const producto1 = {
      id: 'producto1',
      nombre: 'Iphone17 pro max"',
      categoria: 'Celulares',
      marca: 'iphone',
      precio: 2500000,
      stock: 15,
      img: 'Iphone17-promax.png',
    };
     const producto3 = {
    id: 'producto3',
    nombre:'monitor ASUS 24"',
    categoria:'Monitor',
    marca:'asus',
    precio:3500000,
    stock:7,
    img:'monitor-asus.png',};
     
    const producto2 = {
    id: 'producto2',
    nombre: 'Monitor asus 22"',
    categoria: 'Monitor',
    marca: 'asus',
    precio: 1500000,
    stock: 15,
    img: 'Asus-ProArt.png',};

      const producto4 = {
    id: 'producto4',
    nombre: 'Monitor ASUS 27" ',
    categoria: 'Monitor',
    marca: 'asus',
    precio: 1500000,
    stock: 10,
    img: 'monitor-asus.png',};

      const producto5 = {
    id: 'producto5',
    nombre: 'Monitor ASUS pro art',
    categoria: 'Monitor',
    marca: 'asus',
    precio: 1500000,
    stock: 9,
    img: 'Asus-ProArt.png',};

      const producto6 = {
    id: 'producto6',
    nombre: 'Iphone 16 ',
    categoria: 'Celulares',
    marca: 'iphone',
    precio: 3500000,
    stock: 8,
    img: 'Iphone17-promax.png',};

    const producto7= {
    id: 'producto7',
    nombre: 'Iphone-AirPods',
    categoria: 'Perifericos',
    marca: 'iphone',
    precio: 1750000,
    stock: 8,
    img: 'Iphone-AirPods-Max.png',};

  listadoProductos.push(producto1,producto2,producto3,producto4,producto5,producto6,producto7)
  agregarUsuarioLocalStorage(administrador)
  agregarUsuarioLocalStorage(usuario)
  guardar('productos',listadoProductos)

}