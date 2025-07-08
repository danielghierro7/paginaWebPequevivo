// src/data/TodosLosProductos.jsx

export async function getTodosLosProductos() {
    const response = await fetch("/api/productos/con-imagenes");

    if (!response.ok) {
        throw new Error("No se pudo obtener los productos");
    }

    const productos = await response.json();
    return productos;
}
