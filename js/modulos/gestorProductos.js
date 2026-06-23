import { obtener, guardar } from "./gestorStorage.js";

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
