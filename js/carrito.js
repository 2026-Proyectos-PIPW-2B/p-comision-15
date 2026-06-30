import {
  obtenerProductosCarrito,
  obtenerProductoCarrito,
  eliminarProducto,
  incrementarCantidadComprada,
} from "./modulos/gestorCarrito.js";

const tablaBody = document.getElementById("bodyTabla");

window.addEventListener("DOMContentLoaded", inicializar);

function inicializar() {
  agregarListener();
  listarProductos();
}

function agregarListener() {
  const botonEliminar = document.getElementById("btnConfirmarEliminacion");
  botonEliminar.addEventListener("click", ejecutarEliminar);
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

function crearBotonAccion(tipoBoton) {
  const btn = document.createElement("button");
  btn.setAttribute("type", "button");

  if (tipoBoton === "sumar") {
    btn.classList.add("btn", "btn-info");
    btn.innerHTML = "<i class='bi bi-plus-circle-fill'></i>";
  }

  if (tipoBoton === "eliminar") {
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#modalEliminar");
    btn.classList.add("btn", "btn-danger");
    btn.innerHTML = '<i class="bi bi-ban"></i>';
  }
  return btn;
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
    incrementarCantidadComprada(productoCarrito.id);
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
  col_5.appendChild(btn_eliminar);

  fila.appendChild(col_1);
  fila.appendChild(col_2);
  fila.appendChild(col_3);
  fila.appendChild(col_4);
  fila.appendChild(col_5);

  tablaBody.appendChild(fila);
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
