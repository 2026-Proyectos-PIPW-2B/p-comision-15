import { obtener } from "../storage/storage.js";
import { validarDatos as validacion } from "./usuarios.js";

const bodyTabla = document.getElementById("bodyTabla");
const USUARIO_KEY = "usuarios";
inicializacion();
mostrarMovimiento()



function inicializacion() {
  const botonValidar = document.getElementById("botonValidar");
  if (botonValidar) {
    botonValidar.addEventListener("click", creacionDeUsuarios);
  }
}



function creacionDeUsuarios(){
  const nombreCrear = document.getElementById("inputCrearNombre");
  const contraseñaCrear = document.getElementById("inputCrearContraseña");
  const inputEstado = document.getElementById("inputEstado");
  const inputRol = document.getElementById("inputRol");


  const nombre = nombreCrear.value;
  const contraseña = contraseñaCrear.value;
  const estado = inputEstado.value;
  const rol = inputRol.value;
  
  validacion(nombre, contraseña, estado, rol)
}

function mostrarMovimiento() {

   const usuarios = obtener(USUARIO_KEY) || [] 

  bodyTabla.innerHTML = "";
  for (let i = 0; i <= usuarios.length - 1; i++) {
    let indice = i;
    const tr = document.createElement("tr");

    const td_id = document.createElement("td");
    const td_1 = document.createElement("td");
    const td_2 = document.createElement("td");
    const td_3 = document.createElement("td");
    const td_4 = document.createElement("td");
    const td_5 = document.createElement("td");
    const td_6 = document.createElement("td");
    const td_7 = document.createElement("td");

    td_id.textContent = usuarios[i].id;
    td_1.textContent = usuarios[i].nombre;
    td_2.textContent = usuarios[i].contraseña;
    td_3.textContent = usuarios[i].estado;
    td_4.textContent = usuarios[i].rol;
    td_5.innerHTML = '<Button class="btn btn-success mx-2" id="botonHabilitar" ><i class="bi bi-check-square"></i></Button>'
    td_6.innerHTML = '<Button class="btn btn-danger mx-2" id="botonDeshabilitar" ><i class="bi bi-ban"></i></Button>'
    td_7.innerHTML = '</Button><Button class="btn btn-info mx-2" id="botonEditar"><i class="bi bi-clipboard-x"></i></Button>'
   
    tr.appendChild(td_id);
    tr.appendChild(td_1);
    tr.appendChild(td_2);
    tr.appendChild(td_3);
    tr.appendChild(td_4);
    tr.appendChild(td_5);
    tr.appendChild(td_6);
    tr.appendChild(td_7);
    bodyTabla.appendChild(tr);
  }
}

