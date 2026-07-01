import { obtenerImagenes } from "./modulos/gestorImagenes.js";
import {
  agregarProducto,
  obtenerProducto,
  obtenerProductos,
  eliminarProducto,
  editarProducto,
} from "./modulos/gestorProductos.js";

const tablaBody = document.getElementById("bodyTabla");

const inputEditarID = document.getElementById("inputEditarID");
const inputEditarNombre = document.getElementById("inputEditarNombre");
const inputEditarCategoria = document.getElementById("inputEditarCategoria");
const inputEditarStock = document.getElementById("inputEditarStock");

const inputEliminarID = document.getElementById("inputEliminarID");

const clave_productos_ls = "productos";

window.addEventListener("DOMContentLoaded", inicializar);

function inicializar() {
  agregarListener();
  listarProductos();
}

function agregarListener() {
  const botonCrear = document.getElementById("botonCrearProducto");
  const botonEditar = document.getElementById("btnConfirmarEdicion");
  const botonEliminar = document.getElementById("btnConfirmarEliminacion");
  const botonSeleccionarImagen = document.getElementById("btnSeleccionarImg");
  botonCrear.addEventListener("click", crearProducto);
  botonEditar.addEventListener("click", ejecutarEditarProducto);
  botonEliminar.addEventListener("click", ejecutarEliminarProducto);
  botonSeleccionarImagen.addEventListener("click", function () {
    precargarImagenes();
    abrirModal("modalSeleccionarImg");
  });
}

function listarProductos() {
  tablaBody.innerHTML = "";
  const productos = obtenerProductos();
  let producto;

  for (let i = 0; i < productos.length; i++) {
    producto = productos[i];
    agregarProductoEnTabla(producto);
  }
}

function agregarProductoEnTabla(producto) {
  const id = producto.id;
  const nombre = producto.nombre;
  const categoria = producto.categoria;
  const marca = producto.marca;
  const precio = producto.precio;
  const stock = producto.stock;
  const img = producto.img;


  const muestraImagen = document.createElement("img");
  muestraImagen.setAttribute("src", "img/" + img);
  muestraImagen.classList.add("img-fluid", "img-container");

  const fila = document.createElement("tr");

  const col_1 = document.createElement("td");
  const col_2 = document.createElement("td");
  const col_3 = document.createElement("td");
  const col_4 = document.createElement("td");
  const col_5 = document.createElement("td");
  const col_6 = document.createElement("td");
  const col_7 = document.createElement("td");

  const btn_editar = crearBotonAccion("editar");
  btn_editar.addEventListener("click", function () {
    precargarEditarProducto(producto.id);
  });

  const btn_eliminar = crearBotonAccion("eliminar");
  btn_eliminar.addEventListener("click", function () {
    precargarEliminarProducto(producto.id);
  });

  col_1.textContent = nombre;
  col_2.textContent = precio;
  col_3.textContent = categoria;
  col_4.textContent = marca;
  col_5.textContent = stock;
  col_6.appendChild(muestraImagen);
  col_7.appendChild(btn_editar);
  col_7.appendChild(btn_eliminar);

  fila.appendChild(col_1);
  fila.appendChild(col_2);
  fila.appendChild(col_3);
  fila.appendChild(col_4);
  fila.appendChild(col_5);
  fila.appendChild(col_6);
  fila.appendChild(col_7);

  tablaBody.appendChild(fila);
}

function crearBotonAccion(tipoBoton) {
  const btn = document.createElement("button");
  btn.setAttribute("type", "button");

  if (tipoBoton === "editar") {
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#modalEditar");
    btn.classList.add("btn", "btn-info");
    btn.innerHTML = '<i class="bi bi-clipboard-x"></i>';
  }

  if (tipoBoton === "eliminar") {
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#modalEliminar");
    btn.classList.add("btn", "btn-danger");
    btn.innerHTML = '<i class="bi bi-ban"></i>';
  }
  return btn;
}

function crearProducto() {
  let resultado = validarForm();

  if (resultado) {
    agregarProducto(
      inputNombre.value,
      inputCategoria.value,
      inputMarca.value,
      inputPrecio.value,
      inputStock.value,
      inputImg.value,
    );
    listarProductos();
  }
}

function validarForm() {
  let resultado = true;

  const nombreProducto = inputNombre.value;
  const categoriaProducto = inputCategoria.value;
  const marcaProducto = inputMarca.value;
  const precioProducto = inputPrecio.value;
  const stockProducto = inputStock.value;
  const imgProducto = inputImg.value;

  if (nombreProducto.length >= 4) {
    inputNombre.classList.remove("is-invalid")
    inputNombre.classList.add("is-valid");
  } else {
    resultado = false
    inputNombre.classList.remove("is-valid")
    inputNombre.classList.add("is-invalid")
  }

  if (categoriaProducto !== "") {
    inputCategoria.classList.remove("is-invalid")
    inputCategoria.classList.add("is-valid");
  } else {
    resultado = false
    inputCategoria.classList.remove("is-valid")
    inputCategoria.classList.add("is-invalid")
  }

  if (marcaProducto !== "") {
    inputMarca.classList.remove("is-invalid")
    inputMarca.classList.add("is-valid");
  } else {
    resultado = false
    inputMarca.classList.remove("is-valid")
    inputMarca.classList.add("is-invalid")
  }

  if (precioProducto > 0) {
    inputPrecio.classList.remove("is-invalid")
    inputPrecio.classList.add("is-valid");
  } else {
    resultado = false
    inputPrecio.classList.remove("is-valid")
    inputPrecio.classList.add("is-invalid")
  }

  if (stockProducto > 0) {
    inputStock.classList.remove("is-invalid")
    inputStock.classList.add("is-valid");
  } else {
    resultado = false
    inputStock.classList.remove("is-valid")
    inputStock.classList.add("is-invalid")
  }

  if (imgProducto !== "") {
    inputImg.classList.remove("is-invalid")
    inputImg.classList.add("is-valid");
  } else {
    resultado = false 
    inputImg.classList.remove("is-valid")
    inputImg.classList.add("is-invalid")
  }

  return resultado;
}

function precargarEditarProducto(id) {
  const producto = obtenerProducto(id);
  inputEditarID.value = id;
  inputEditarNombre.value = producto.nombre;
  inputEditarCategoria.value = producto.categoria;
  inputEditarStock.value = producto.stock;
}

function precargarEliminarProducto(id) {
  inputEliminarID.value = id;
}

function precargarImagenes() {
  const divImagenes = document.getElementById("divImagenes");
  const imagenes = obtenerImagenes();
  divImagenes.innerHTML = "";

  for (let i = 0; i < imagenes.length; i++) {
    let imagen = document.createElement("img");
    imagen.setAttribute("src", "./img/" + imagenes[i]);
    imagen.setAttribute("data-name", imagenes[i]);
    imagen.classList.add("col-4", "img-thumbnail", "hover-zoom");
    divImagenes.appendChild(imagen);

    imagen.addEventListener("click", function (evento) {
      const nombreArchivo = evento.target.getAttribute("data-name");
      document.getElementById("inputImg").value = nombreArchivo;
      cerrarModal("modalSeleccionarImg");
    });
  }
}

function ejecutarEditarProducto() {
  let resultado = true;

  let id = inputEditarID.value;
  let nombre = inputEditarNombre.value;
  let categoria = inputEditarCategoria.value;
  let stock = inputEditarStock.value;

  if (nombre.length >= 4) {
    inputEditarNombre.classList.remove("is-invalid")
    inputEditarNombre.classList.add("is-valid");
  } else {
    resultado = false
    inputEditarNombre.classList.remove("is-valid")
    inputEditarNombre.classList.add("is-invalid")
  }

  if (categoria !== "") {
    inputEditarCategoria.classList.remove("is-invalid")
    inputEditarCategoria.classList.add("is-valid");
  } else {
    resultado = false
    inputEditarCategoria.classList.remove("is-valid")
    inputEditarCategoria.classList.add("is-invalid")
  }

  if (stock > 0) {
    inputEditarStock.classList.remove("is-invalid")
    inputEditarStock.classList.add("is-valid");
  } else {
    resultado = false
    inputEditarStock.classList.remove("is-valid")
    inputEditarStock.classList.add("is-invalid")
  }

  if (resultado === true) {
    editarProducto(id, nombre, categoria, stock);

    inputEditarNombre.classList.remove("is-invalid", "is-valid")
    inputEditarCategoria.classList.remove("is-invalid", "is-valid")
    inputEditarStock.classList.remove("is-invalid", "is-valid")

    cerrarModal("modalEditar");
    listarProductos();
  }
}

function ejecutarEliminarProducto() {
  const id = inputEliminarID.value;
  const producto = obtenerProducto(id);

  if (producto !== null) {
    eliminarProducto(producto.id);
  }

  cerrarModal("modalEliminar");
  listarProductos();
}


function abrirModal(modalID) {
  const modalElement = document.getElementById(modalID);
  const modalInstance = new bootstrap.Modal(modalElement);

  if (modalInstance) {
    modalInstance.show();
  }
}

function cerrarModal(modalID) {
  const modalElement = document.getElementById(modalID);
  const modalInstance = bootstrap.Modal.getInstance(modalElement);

  if (modalInstance) {
    modalInstance.hide();
  }
}
