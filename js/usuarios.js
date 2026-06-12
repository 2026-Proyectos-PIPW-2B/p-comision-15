


let usuariosArray = []


let usuarios = {
    nombre,
    contraseña,
    estado,
    rol,
}

const inputNombre = document.getElementById("FloatInputNombre")
const inputContraseña = document.getElementById("FloatInputContraseña")

const nombreCrear = document.getElementById("inputCrearNombre")
const contraseñaCrear = document.getElementById("inputCrearContraseña")

function crearUsuario(){
    let nombre = nombreCrear.value
    let contraseña = contraseñaCrear.value

    if(nombre.length >= 4){
        
    }
}


function inicioSesion(){

}

function agregarUsuarioLocalStorage(){
    const usuariosString = JSON.stringify(usuariosArray)
    localStorage.setItem("usuarios", usuariosString)
}