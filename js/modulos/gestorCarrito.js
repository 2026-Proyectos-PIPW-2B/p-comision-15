import { obtener, guardar } from "./gestorStorage.js";

const clave_productosCarrito_ls = "productosComprados";

export function obtenerProductosCarrito() {
  const productos = obtener(clave_productosCarrito_ls) || [];
  return productos;
}

export function obtenerProductoCarrito(id) {
  let retorno = null;
  const productos = obtenerProductosCarrito();

  for (let i = 0; i < productos.length && retorno == null; i++) {
    if (productos[i].id == id) {
      retorno = productos[i];
    }
  }
  return retorno;
}

export function incrementarCantidadComprada(id) {
  const productos = obtenerProductosCarrito();
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == id) {
      productos[i].cantidad = productos[i].cantidad + 1;
    }
  }
  guardar(clave_productosCarrito_ls,productos)
}

export function eliminarProducto(id) {
  let productos = obtenerProductosCarrito();
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      productos.splice(i, 1);
        guardar(clave_productosCarrito_ls,productos)
      break;
    }
  }
 
}


