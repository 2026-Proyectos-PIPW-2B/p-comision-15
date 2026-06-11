let usuariosArray = []


let usuarios = {
    nombre,
    contraseña,
    estado,
    tipo,
}

const inputNombre = document.getElementById("FloatInputNombre")
const inputContraseña = document.getElementById("FloatInputContraseña")

function inicioSesion(){

}

function agregarUsuarioLocalStorage(){
    const usuariosString = JSON.stringify(usuariosArray)
    localStorage.setItem("usuarios", usuariosString)
}