import {
  agregarProducto,
  obtenerProductos,
} from "./modulos/gestorProductos.js";

const tablaBody = document.getElementById("bodyTabla");


window.addEventListener("DOMContentLoaded", inicializar);

function inicializar() {
  agregarListenerBotones();
  listarProductos();
}

function agregarListenerBotones() {
  const botonCrear = document.getElementById("botonCrearProducto");
  botonCrear.addEventListener("click", crearProducto);
}

function listarProductos() {
  const productos = obtenerProductos();
  let producto;
  for (let i = 0; i < productos.length; i++) {
    producto = productos[i]
    agregarFilaEnTabla(producto);
  }
}

function crearProducto() {
const inputNombre = document.getElementById("inputNombre");
const inputCategoria = document.getElementById("inputCategoria");
const inputMarca = document.getElementById("inputMarca");
const inputPrecio = document.getElementById("inputPrecio");
const inputStock = document.getElementById("inputStock");


const nombreProducto = inputNombre.value;
const categoriaProducto = inputCategoria.value;
const marcaProducto = inputMarca.value;
const precioProducto = inputPrecio.value;
const stockProducto = inputStock.value;


  let condiciones = validarForm(
    nombreProducto,
    categoriaProducto,
    marcaProducto,
    precioProducto,
    stockProducto,
  );
  if (condiciones["valido"] === true) {
    agregarProducto(
      nombreProducto,
      categoriaProducto,
      marcaProducto,
      precioProducto,
      stockProducto,
    );
  }
}

function validarForm(
  inputNombre,
  inputCategoria,
  inputMarca,
  inputPrecio,
  inputStock,
) {
  const resultado = {
    valido: true,
    errores: [],
  };

  if (inputNombre.length < 4) {
    resultado.valido = false;
    resultado["errores"].push("El nombre debe tener mas de 4 caracteres");
  }
  if (inputCategoria === "") {
    resultado.valido = false;
    resultado["errores"].push("Debe seleccionar una categoria");
  }
  if (inputMarca === "") {
    resultado.valido = false;
    resultado["errores"].push("Debe seleccionar una marca");
  }
  if (inputPrecio <= 0) {
    resultado.valido = false;
    resultado["errores"].push("El precio debe ser mayor a 0");
  }
  if (inputStock <= 0) {
    resultado.valido = false;
    resultado["errores"].push("El producto debe tener stock");
  }

  return resultado;
}

function agregarFilaEnTabla(producto) {
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

  col_1.textContent = nombre;
  col_2.textContent = precio;
  col_3.textContent = categoria;
  col_4.textContent = marca;
  col_5.textContent = stock;

  fila.appendChild(col_1);
  fila.appendChild(col_2);
  fila.appendChild(col_3);
  fila.appendChild(col_4);
  fila.appendChild(col_5);

  tablaBody.appendChild(fila);
}
