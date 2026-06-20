
export function guardar(key, data){
    const parsedData = JSON.stringify(data);
    localStorage.setItem(key, parsedData);
}

export function obtener(key){
    const data = localStorage.getItem(key);
    return JSON.parse(data);
}

export function eliminar(key){
    localStorage.removeItem(key)
}

export function eliminarTodo(){
    localStorage.clear()
}
