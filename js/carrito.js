import {obtenerProductosCarrito} from "./gestorCarrito.js"

const tablaBody = document.getElementById("bodyTabla");

function crearBotonAccion(tipoBoton) {
  const btn = document.createElement("button");
  btn.setAttribute("type", "button");

  if (tipoBoton === "sumar") {
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#modalSumarCantidad");
    btn.classList.add("btn", "btn-info");
    btn.innerHTML = "<i class='bi bi-plus-circle-fill'></i>"
  }

  if (tipoBoton === "eliminar") {
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#modalEliminar");
    btn.classList.add("btn", "btn-danger");
    btn.innerHTML = '<i class="bi bi-ban"></i>';
  }
  return btn;
}


function agregarProductoEnTabla (){
    let productosCarrito = obtenerProductosCarrito()

    const nombre = productosCarrito.nombreProducto
    const marca = productosCarrito.marcaProducto
    const precio = productosCarrito.precioProducto
    //cantidad

    btn_sumar = crearBotonAccion(sumar)
    btn_sumar.addEventListener("click", function () {
        precargarAvisoAgregarCantidad(producto.id);
    });

    btn_eliminar = crearBotonAccion(eliminar)
        btn_eliminar.addEventListener("click", function () {
    precargarAvisoEliminar(producto.id);
    });

    const fila = document.createElement("tr");

    const col_1 = document.createElement("td");
    const col_2 = document.createElement("td");
    const col_3 = document.createElement("td");
    const col_4 = document.createElement("td");

    col_1.textContent = nombre;
    col_2.textContent = precio;
    col_3.textContent = marca;
    col_4.appendChild(btn_sumar);
    col_4.appendChild(btn_eliminar);

    fila.appendChild(col_1);
    fila.appendChild(col_2);
    fila.appendChild(col_3);
    fila.appendChild(col_4);
    fila.appendChild(col_5);

    tablaBody.appendChild(fila);
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