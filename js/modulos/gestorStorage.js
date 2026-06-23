const tiempoExpiracionAdministrador = 300000

export function guardar(key, data){
    const parsedData = JSON.stringify(data);
    localStorage.setItem(key, parsedData);
}

export function obtener(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function eliminar(key) {
  localStorage.removeItem(key);
}

export function eliminarTodo() {
  localStorage.clear();
}

export function iniciarConteoSesion(key){
      let inicio = key
      const tiempoExpiracion = new Date().getTime() + tiempoExpiracionAdministrador
      localStorage.setItem('sesion', inicio)
      localStorage.setItem('tiempoExpiracion', tiempoExpiracion)
}

export function obtenerSesion (key){
    const data = localStorage.getItem(key)
    return (data)
}
