import { obtener } from "../storage/storage";


const PRODUCTO_KEY = "producto"

function crearProducto(nombreProducto, categoriaProducto, marcaProducto, precioProducto, stockProducto) {
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

function validarNuevoProducto(){
    const newNombre = document.getElementById(inputNombre)
    const newCategoria = document.getElementById(inputCategoria)
    const newMarca = document.getElementById(inputMarca)
    const newPrecio = document.getElementById(inputPrecio)
    const newStock = document.getElementById(inputStock)

    const nombre = newNombre.value
    const categoria = newCategoria.value
    const marca = newMarca.value
    const precio = newPrecio.value
    const stock = newStock.value

    const validacion = validarProducto()

    if(validacion.resultado){
        agregarProductoLocalStorage(crearProducto(nombre, categoria, marca, precio, stock))
    }
}

function validarProducto(nombreProducto, categoriaProducto, marcaProducto, precioProducto, stockProducto){
    const prod = { resultado: true, errores: [],}
    if (nombreProducto.length === 0){
       prod["resultado"] = false
       prod.errores.push("El producto debe tener un nombre")
    }

    if (categoriaProducto.value == ""){
        prod["resultado"] = false
        prod.errores.push("Debe seleccionar una categoria")
    }

    if (marcaProducto.value == ""){
        prod["resultado"] = false
        prod.errores.push("Debe seleccionar una marca")
    }

    if (precioProducto.value < 0 || precioProducto.value == ""){
        prod["resultado"] = false
        prod.errores.push("El producto debe tener un precio")
    }

    if (stockProducto.value < 0 || precioProducto.value == ""){
        prod["resultado"] = false
        prod.resultado.push("El producto debe tener stock")
    }

    return prod
}

function agregarProductoLocalStorage(producto) {
  const productosString = JSON.parse(localStorage.getItem("productos")) || [];
  productosString.push(producto);
  localStorage.setItem("productos", JSON.stringify(productosString));

    const productos = obtener(PRODUCTO_KEY) || []
    productos.push(producto)
    guardar("productos", productos)
    obtener(productos)


}