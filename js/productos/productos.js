import { obtener } from "../storage/storage";
import { guardar } from "../storage/storage";

export function validarForm(inputNombre, inputCategoria, inputMarca, inputPrecio, inputStock){
    const resultado = {
        valido: true,
        errores: []
    }

    if (inputNombre.length < 4){
        resultado.valido = false
        resultado.errores.push("El nombre debe tener mas de 4 caracteres")
    }
    if (inputCategoria === ""){
        resultado.valido = false
        resultado.errores.push("Debe seleccionar una categoria")
    }
    if (inputMarca === ""){
        resultado.valido = false
        resultado.errores.push("Debe seleccionar una marca")
    }
    if (inputPrecio <= 0){
        resultado.valido = false
        resultado.errores.push("El precio debe ser mayor a 0")
    }
    if (inputStock <= 0){
        resultado.valido = false
        resultado.errores.push("El producto debe tener stock")
    } 
} 

export function crearObjProducto(nombreProducto, categoriaProducto, marcaProducto, precioProducto, stockProducto) {
  const producto = {
    nombre: nombreProducto,
    categoria: categoriaProducto,
    marca: marcaProducto,
    precio: precioProducto,
    stock: stockProducto,
    carrito : []
  };
  return producto;
}

export function agregarProductoLocalStorage(producto) {
    const datosProductos = obtener("productos") || []

    datosProductos.push(producto)
    guardar("productos", datosProductos)
}


