// src/data/TodosLosProductos.jsx

// Accede a la variable de entorno PUBLIC_BACKEND_URL
// Si la variable no está definida (ej. en tu máquina si no usas .env), usa un valor por defecto para desarrollo local
const BACKEND_BASE_URL = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:8080';

export async function getTodosLosProductos() {
    const PATH = "/api/productos/con-imagenes"; // Esta es la ruta específica de tu API
    const fullUrl = `${BACKEND_BASE_URL}${PATH}`; // Combina la base con la ruta

    try {
        // Ya no necesitas 'new URL()', 'fetch' aceptará la string completa
        console.log("🌍 GET URL:", fullUrl);

        const response = await fetch(fullUrl);

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
        // Vuelve a lanzar el error para que Astro lo capture durante el prerenderizado
        throw error;
    }
}
