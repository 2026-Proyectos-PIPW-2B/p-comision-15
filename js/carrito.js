import {
  obtenerProductosCarrito,
  obtenerProductoCarrito,
  eliminarProducto,
 // incrementarCantidadComprada,
} from "./modulos/gestorCarrito.js";

import { guardar } from "./modulos/gestorStorage.js";
import { cerrarSesion } from "./modulos/gestorUsuarios.js";
const tablaBody = document.getElementById("bodyTabla");
const clave_productosCarrito_ls = "productosComprados";

window.addEventListener("DOMContentLoaded", inicializar);

function inicializar() {
  agregarListener();
  listarProductos();
  mostrarCarrito();
  botonComprar();

}

function agregarListener() {
  const botonEliminar = document.getElementById("btnConfirmarEliminacion");
    const botonDesconexion = document.getElementById("botonDesconexion")
  botonEliminar.addEventListener("click", ejecutarEliminar);
  botonDesconexion.addEventListener('click',cerrarSesion);
  
}
 function mostrarCarrito (){
  const carrito = obtenerProductosCarrito()
  const carritoVacio = document.getElementById('carritoVacio')
  const listadoCarrito = document.getElementById('carrito')

  if (carrito.length < 1){ 
    carritoVacio.style.display = 'block';
    listadoCarrito.style.display = 'none'

  }else {
    carritoVacio.style.display = 'none' 
    listadoCarrito.style.display = 'block'
  }

  }

function listarProductos() {
  tablaBody.innerHTML = "";
  const productos = obtenerProductosCarrito();
  let producto;

  for (let i = 0; i < productos.length; i++) {
    producto = productos[i];
    agregarProductoEnTabla(producto);
  }
}



function agregarProductoEnTabla(productoCarrito) {
  const inputEliminarID = document.getElementById("inputEliminarID");
  const id = productoCarrito.id;
  const nombre = productoCarrito.nombreProducto;
  const marca = productoCarrito.marcaProducto;
  const precio = productoCarrito.precioProducto;
  const cantidad = productoCarrito.cantidad;

  const btn_sumar = crearBotonAccion("sumar");
  btn_sumar.addEventListener("click", function () {
    sumarCantidadComprada(productoCarrito.id);
  });

   const btn_restar = crearBotonAccion("restar");
  btn_restar.addEventListener("click", function () {
    restarCantidadComprada(productoCarrito.id);
  });


  const btn_eliminar = crearBotonAccion("eliminar");
  btn_eliminar.addEventListener("click", function () {
    inputEliminarID.value = id;
  });

  const fila = document.createElement("tr");

  const col_1 = document.createElement("td");
  const col_2 = document.createElement("td");
  const col_3 = document.createElement("td");
  const col_4 = document.createElement("td");
  const col_5 = document.createElement("td");

  col_1.textContent = nombre;
  col_2.textContent = precio;
  col_3.textContent = marca;
  col_4.textContent = cantidad;
  col_5.appendChild(btn_sumar);
  col_5.appendChild(btn_restar);
  col_5.appendChild(btn_eliminar);

  col_5.classList.add('d-flex','gap-2', 'c')
  fila.appendChild(col_1);
  fila.appendChild(col_2);
  fila.appendChild(col_3);
  fila.appendChild(col_4);
  fila.appendChild(col_5);

  tablaBody.appendChild(fila);
    calcularTotal ()
}
function crearBotonAccion(tipoBoton) {
  const btn = document.createElement("button");
  btn.setAttribute("type", "button");

  if (tipoBoton === "sumar") {
    btn.classList.add("btn", "btn-info");
    btn.innerHTML = "<i class='bi bi-plus-circle-fill'></i>";
  }
    if (tipoBoton === "restar") {
    btn.classList.add("btn", "fondo-boton");
    btn.innerHTML =  ' <i class="bi bi-dash-lg"></i>';
  }

  if (tipoBoton === "eliminar") {
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#modalEliminar");
    btn.classList.add("btn", "btn-danger");
    btn.innerHTML = '<i class="bi bi-ban"></i>';
  }
  if(tipoBoton === 'comprar'){
      btn.classList.add("btn", "color-fuente-primario", 'fondo-boton','w-50','my-2');
      btn.textContent = 'comprar'
  }

  return btn;
}

function ejecutarEliminar() {
  const id = document.getElementById("inputEliminarID").value;
  const producto = obtenerProductoCarrito(id);
  if (producto != null) {
    eliminarProducto(producto.id);
  }

  cerrarModal("modalEliminar");
  listarProductos();
}

function cerrarModal(modalID) {
  const modalElement = document.getElementById(modalID);
  const modalInstance = bootstrap.Modal.getInstance(modalElement);

  if (modalInstance) {
    modalInstance.hide();
  }
}

function sumarCantidadComprada(id) {
  const productos = obtenerProductosCarrito();
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == id) {
      productos[i].cantidad = productos[i].cantidad + 1;
    }
  }
  guardar(clave_productosCarrito_ls,productos);
  listarProductos();
  }
  function restarCantidadComprada(id) {
  const productos = obtenerProductosCarrito();
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == id) {
        if(productos[i].cantidad<=1){
                eliminarProducto(id)
                calcularTotal ()
                listarProductos();
                return
          }else{
              productos[i].cantidad = productos[i].cantidad - 1;}
                guardar(clave_productosCarrito_ls,productos);            
    }
  }
  listarProductos();
  }

  function calcularTotal (){
    const costoCompra = document.getElementById('costoTotal')
    const productos = obtenerProductosCarrito()
    let total = 0 ;
    let totalProducto
    if (productos.length > 0){
    for(let i = 0 ; i < productos.length ;i++){
      let producto = productos[i]
      totalProducto = (producto.precioProducto * producto.cantidad)
      total = total + totalProducto
    }
  } 
  costoCompra.innerHTML = ("Costo total de los productos :" + total)
  }

  function botonComprar(){
    const div = document.createElement('div')
     const costoCompra = document.getElementById('divComprar')
      const btn_comprar = crearBotonAccion('comprar')
      div.classList.add('justify-content-center','d-flex')

      div.appendChild(btn_comprar)
    costoCompra.appendChild(div)

  }