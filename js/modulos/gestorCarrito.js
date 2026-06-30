import {obtener} from "./gestorStorage.js"

const clave_productosCarrito_ls = "productosComprados"

export function obtenerProductosCarrito() {
  const productos = obtener(clave_productosCarrito_ls) || [];
  return productos;
}