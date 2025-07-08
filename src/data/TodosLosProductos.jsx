// src/data/TodosLosProductos.jsx

export async function getTodosLosProductos() {
    const BASE_URL = "https://24aae5a65087.ngrok-free.app";
    const PATH = "/api/productos/con-imagenes";

    try {
        const url = new URL(PATH, BASE_URL);
        console.log("🌍 GET URL:", url.toString());

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Error ${response.status} - ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            throw new Error(`Respuesta no es JSON. Content-Type: ${contentType}`);
        }

        const productos = await response.json();
        console.log("✅ Productos:", productos);

        return productos;

    } catch (error) {
        console.error("❌ Error en getTodosLosProductos:", error);
        throw error;
    }
}
