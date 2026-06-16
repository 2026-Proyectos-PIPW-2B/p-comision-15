let bodyTabla;
window.addEventListener("load", function () {
   
  bodyTabla = document.getElementById("bodyTabla");
  inicializacion();
  mostrarMovimiento();
});
function inicializacion() {
  const botonValidar = document.getElementById("botonValidar");
  const botonSesion = document.getElementById("botonSesion")
  if (botonValidar)
   {botonValidar.addEventListener("click", validarDatos);}
  if(botonSesion)
    {botonSesion.addEventListener("click",inicioSesion);

  }
}

function validarDatos() {
  const nombreCrear = document.getElementById("inputCrearNombre");
  const contraseñaCrear = document.getElementById("inputCrearContraseña");

  const divValidacion = document.getElementById("divValidacion");


  const nombre = nombreCrear.value;
  const contraseña = contraseñaCrear.value;
  const validacion = validarUsuario(nombre, contraseña);

  if (validacion.resultado === true) {
    agregarUsuarioLocalStorage(crearUsuario(nombre, contraseña));
    mostrarMovimiento();
  }
}
function validarUsuario(nombre, contraseña) {
  const cuenta = { resultado: true, fallos: []};

  if (nombre.length < 4) {
    cuenta["resultado"] = false;
    cuenta.fallos.push("El nombre de usuario debe tener al menos 4 letras ");
  }
  if (contraseña.length<4 || contraseña.length > 10) {
    cuenta["resultado"] = false;
    cuenta.fallos.push(
      "La contraseña del usuario debe tener entre 4 y 10 caracteres",
    );
  }
  return cuenta;
}

function crearUsuario(nombreUsuario, contraseña) {
  const usuario =  {
    nombre: nombreUsuario,
    contraseña: contraseña,
    estado: "habilitado",
    rol: "Usuario",
  };
 return usuario;
}
function inicioSesion() {
  const inputNombre = document.getElementById("FloatInputNombre");
  const inputContraseña = document.getElementById("FloatInputContraseña");
  const nombreUsuario = inputNombre.value
  const contraseñaUsuario = inputContraseña.value

  let encontrado = false
  const usuariosDelArray = JSON.parse(localStorage.getItem("usuarios"));

     for (let i = 0; i <= usuariosDelArray.length - 1; i++) { 

      if(nombreUsuario === usuariosDelArray[i].nombre && contraseñaUsuario === usuariosDelArray[i].contraseña){
        encontrado = true
        break;
      }
  }

if(encontrado){
  window.alert("Se encontro")
}else{
  window.alert("no se encontro")
}
encontrado=false;
}


function agregarUsuarioLocalStorage(usuario) {
  const usuariosString = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuariosString.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuariosString));
}

function mostrarMovimiento() {
  const usuariosDelArray = JSON.parse(localStorage.getItem("usuarios"));

  bodyTabla.innerHTML = "";
  for (let i = 0; i <= usuariosDelArray.length - 1; i++) {
    let indice = i;
    const tr = document.createElement("tr");

    const td_1 = document.createElement("td");
    const td_2 = document.createElement("td");
    const td_3 = document.createElement("td");
    const td_4 = document.createElement("td");
    const td_5 = document.createElement("td");
    const td_6 = document.createElement("td");

    td_1.textContent = usuariosDelArray[i].nombre;
    td_2.textContent = usuariosDelArray[i].contraseña;
    td_3.textContent = usuariosDelArray[i].estado;
    td_4.textContent = usuariosDelArray[i].rol;
    td_5.innerHTML =
      '<Button class="btn btn-success mx-2"><i class="bi bi-check-square"></i></Button><Button class="btn btn-danger mx-2"><i class="bi bi-ban"></i></Button><Button class="btn btn-info mx-2"><i class="bi bi-clipboard-x"></i></Button>';

    tr.appendChild(td_1);
    tr.appendChild(td_2);
    tr.appendChild(td_3);
    tr.appendChild(td_4);
    tr.appendChild(td_5);
    bodyTabla.appendChild(tr);
  }
}
