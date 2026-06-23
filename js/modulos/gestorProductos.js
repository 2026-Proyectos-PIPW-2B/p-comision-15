import { obtener, guardar } from "./gestorStorage.js";

const clave_productos_ls = "productos";

export function agregarProducto(nombre, categoria, marca, precio, stock) {
  const productos = obtener(clave_productos_ls) || [];

  const producto = {
    nombre: nombre,
    categoria: categoria,
    marca: marca,
    precio: precio,
    stock: stock,
  };
  productos.push(producto);
  guardar(clave_productos_ls, productos);
}

export function obtenerProductos() {
  const productos = obtener(clave_productos_ls) || [];
  return productos;
}
