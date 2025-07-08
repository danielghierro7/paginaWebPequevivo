// src/data/TodosLosProductos.jsx

export async function getTodosLosProductos() {

    const BASE_BACKEND_URL = "https://24aae5a65087.ngrok-free.app";

    const response = await fetch(BASE_BACKEND_URL + "/api/productos/con-imagenes");


    if (!response.ok) {
        throw new Error("No se pudo obtener los productos");
    }

    const productos = await response.json();
    return productos;
}
