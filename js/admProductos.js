import {
  agregarProducto,
  obtenerProducto,
  obtenerProductos,
  eliminarProducto,
} from "./modulos/gestorProductos.js";

const tablaBody = document.getElementById("bodyTabla");

const inputEditarNombre = document.getElementById("inputEditarNombre");
const inputEditarCategoria = document.getElementById("inputEditarCategoria");
const inputEditarStock = document.getElementById("inputEditarStock");

const clave_productos_ls = "productos";

window.addEventListener("DOMContentLoaded", inicializar);

function inicializar() {
  agregarListener();
  listarProductos();
}

function agregarListener() {
  const botonCrear = document.getElementById("botonCrearProducto");
  botonCrear.addEventListener("click", crearProducto);
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

  const fila = document.createElement("tr");

  const col_1 = document.createElement("td");
  const col_2 = document.createElement("td");
  const col_3 = document.createElement("td");
  const col_4 = document.createElement("td");
  const col_5 = document.createElement("td");
  const col_6 = document.createElement("td");

  const btn_editar = crearBotonAccion("editar",`btnEditarProducto-${producto.id}`, "editar");
  btn_editar.addEventListener("click", function () {
    ejecutarEditarProducto(producto.id);
  });

  const btn_eliminar = crearBotonAccion("eliminar", `btnEliminarProducto-${producto.id}`, "eliminar");
  btn_eliminar.addEventListener("click", function () {
    ejecutarEliminarProducto(producto.id);
  });

  col_1.textContent = nombre;
  col_2.textContent = precio;
  col_3.textContent = categoria;
  col_4.textContent = marca;
  col_5.textContent = stock;
  col_6.appendChild(btn_editar);
  col_6.appendChild(btn_eliminar);

  fila.appendChild(col_1);
  fila.appendChild(col_2);
  fila.appendChild(col_3);
  fila.appendChild(col_4);
  fila.appendChild(col_5);
  fila.appendChild(col_6);

  tablaBody.appendChild(fila);
}

function crearBotonAccion(textoBoton, id_btn, tipoDeBtn) {
  const btn = document.createElement("button");
  btn.textContent = textoBoton;
  btn.setAttribute("type", "button");
  btn.setAttribute("id", id_btn)

  if (tipoDeBtn === "editar"){
    btn.setAttribute("data-bs-toggle", "modal")
    btn.setAttribute("data-bs-target", "#modalEditar")
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

  if (nombreProducto.length < 4) {
    resultado = false;
    inputNombre.classList.add("is-invalid");
    //resultado.errores.push("El nombre debe tener mas de 4 caracteres");
  }
  if (categoriaProducto === "") {
    resultado = false;
    inputCategoria.classList.add("is-invalid");
    //resultado.errores.push("Debe seleccionar una categoria");
  }
  if (marcaProducto === "") {
    resultado = false;
    inputMarca.classList.add("is-invalid");
    //resultado.errores.push("Debe seleccionar una marca");
  }
  if (precioProducto <= 0) {
    resultado = false;
    inputPrecio.classList.add("is-invalid");
    //resultado.errores.push("El precio debe ser mayor a 0");
  }
  if (stockProducto <= 0) {
    resultado = false;
    inputStock.classList.add("is-invalid");
    //resultado.errores.push("El producto debe tener stock");
  }
  return resultado;
}

function ejecutarEditarProducto(id) {
  const producto = obtenerProducto(id);
  inputEditarNombre.value = producto.nombre;
  inputEditarCategoria.value = producto.categoria;
  inputEditarStock.value = producto.stock;
}

function ejecutarEliminarProducto(id) {
  const producto = obtenerProducto(id)

  if (producto !== null){
    eliminarProducto(producto.id)
  }

  tablaBody.innerHTML = ""

  listarProductos()


  //alert("Anda a eliminar el producto con id " + id);
}
