import {inicioSesion, buscarContraseña, buscarUsuario, verificarSesion, cerrarSesion, obtenerUsuario, obtenerUsuarios} from './modulos/gestorUsuarios.js'
import {guardar, obtener } from './modulos/gestorStorage.js'
import { obtenerProducto, obtenerProductos } from './modulos/gestorProductos.js';

const urlActual = 'catalogo.html';
const muestraProductos = document.getElementById('muestraProductos')
window.addEventListener('DOMContentLoaded', inicializar)


function inicializar(){
     iniciarInputs()
     sesionIniciada()
     mostrarProductos()
  }
function iniciarInputs(){
  const botonSesion = document.getElementById("botonSesion");
  const botonCarrito = document.getElementById('botonCarrito');
  const botonDesconexion = document.getElementById("botonDesconexion");
  const categoriaMonitor = document.getElementById('categoriaMonitor')        
  const categoriaCelulares = document.getElementById('categoriaCelulares')    
  const categoriaPerifericos = document.getElementById('categoriaPerifericos')
  const inputFiltroDescripcion = document.getElementById('inputFiltroDescripcion');

  inputFiltroDescripcion.addEventListener('keyup', filtrarProductos);
  botonSesion.addEventListener("click", obtenerDatos);
  botonDesconexion.addEventListener('click',cerrarSesion);
  botonCarrito.addEventListener('click',redirigirAlCarrito);
  categoriaMonitor.addEventListener('click',obtenerCategoria)
  categoriaCelulares.addEventListener('click',obtenerCategoria)
  categoriaPerifericos.addEventListener('click',obtenerCategoria)
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
          inicioSesion(nombreUsuario, contraseñaUsuario,urlActual)
        }else{
          mostrarError('El usuario esta deshabilitado ')
        }
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

function mostrarError(mensaje) {
    document.getElementById('mensajesError').textContent = mensaje;
} 

function redirigirAlCarrito (){
  if(verificarSesion()){
    window.location.href = '../carrito.html'
  }
}

function mostrarProductos() {
     const productos = obtenerProductos()

     let producto;
     muestraProductos.innerHTML = "";
   
      for (let i = 0; i < productos.length; i++) {
      producto = productos[i]
     crearCard(producto)
       }
      }

function crearCard(producto){
     
  const id = producto.id;
  const nombre = producto.nombre;
  const categoria = producto.categoria;
  const marca = producto.marca;
  const precio = producto.precio;
  const stock = producto.stock;
  const img = producto.img

  const col = document.createElement('div')
  const card = document.createElement('div')
  const card_body = document.createElement('div')
  const btn_comprar = crearBotonAccion();
    btn_comprar.addEventListener("click", function () {
      agregarAlCarrito(id);
       });

  col.classList.add('col')
  card.classList.add('card', 'rounded-4', 'my-3')
  card_body.classList.add('card-body','d-flex', 'flex-column')

  const nombreProducto = document.createElement('h5');
      nombreProducto.classList.add('card-tittle','text-center');
      nombreProducto.textContent = nombre;

  const precioProducto = document.createElement('p');
      precioProducto.classList.add('card-text', 'fs-4', 'text-center');
      precioProducto.textContent = ("$ " + precio);
  
  const imagenProducto = document.createElement('img');
  imagenProducto.src = img
  imagenProducto.classList.add('card-img')

  card_body.appendChild(nombreProducto);
  card_body.appendChild(precioProducto);
  card_body.appendChild(btn_comprar);

  card.appendChild(imagenProducto);
  card.appendChild(card_body);
  col.appendChild(card);
        
  muestraProductos.appendChild(col)

}


function agregarAlCarrito(id){
const botonComprar = document.getElementById('botonComprar')
const listadoProductos = obtener('productosComprados') || [];

console.log('asddas')

if (!verificarSesion()){
  abrirModal()
}
  const productoComprado = {
  nombreProducto  : obtenerProducto(id).nombre ,
  marcaProducto : obtenerProducto(id).marca,
  precioProducto : obtenerProducto(id).precio,
}

  listadoProductos.push(productoComprado)
  guardar('productosComprados',listadoProductos)
}

function crearBotonAccion() {
  const btn = document.createElement("button");
        btn.classList.add('btn', 'fondo-boton', 'col-80', 'align-self-center')
        btn.setAttribute("type", "button");
        btn.textContent = 'Sumar al carrito';
        return btn
}

function abrirModal(){
  let modalLogin = document.getElementById('modalLogin')
  let modal = new bootstrap.Modal(modalLogin);
  modal.show();
}

function filtrarProductos (){
    const productos = obtener('productos')
    const inputFiltroDescripcion = document.getElementById('inputFiltroDescripcion').value
    
     muestraProductos.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
    let producto = productos[i]

     const mismaDescripcion =
        inputFiltroDescripcion === "" ||
        productos[i].nombre.toLowerCase().includes(inputFiltroDescripcion);
     
        if (mismaDescripcion) { 
               crearCard(producto)
      }}
}
function obtenerCategoria (){
let categoria = this.textContent.toLowerCase()
console.log(categoria.length)
const productos = obtener('productos')
  muestraProductos.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
    let producto = productos[i]
     const mismaCategoria =  (productos[i].categoria.toLowerCase() == categoria);
      console.log((productos[i].categoria.toLowerCase()).length)
     console.log( productos[i].categoria,i)
      if (mismaCategoria) {
        crearCard(producto)
      }
    }

}