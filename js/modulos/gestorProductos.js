import { obtener, guardar, eliminar } from "./gestorStorage.js";

const clave_productos_ls = "productos";

export function agregarProducto(nombre, categoria, marca, precio, stock) {
  const productos = obtener(clave_productos_ls) || [];
  const id = crypto.randomUUID();

  const producto = {
    id: id,
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

export function obtenerProducto(id){
  let retorno = null
  const productos = obtenerProductos()
  
  for(let i = 0; i < productos.length && retorno == null; i++){
    if (productos[i].id == id){
      retorno = productos[i]
    }
  }
  return retorno
}

export function eliminarProducto(id){
  let productos = obtenerProductos()

  for (let i = 0; i < productos.length; i++){
    if (productos[i].id === id){
      productos.splice(i, 1)
      break
    }
  }
  localStorage.setItem(clave_productos_ls, JSON.stringify(productos))
}

export function editarProducto(id, nombre, categoria, stock){
  let productos = obtenerProductos()

  for (let i = 0; i < productos.length; i++){
    if (productos[i].id === id){
      productos[i].nombre = nombre
      productos[i].categoria = categoria
      productos[i].stock = stock
      break
    }
  }
  localStorage.setItem(clave_productos_ls, JSON.stringify(productos))
}
