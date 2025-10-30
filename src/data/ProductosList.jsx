import { useState, useEffect } from "react";

export function useFetchProductos(categoria, categoriaDeProducto) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rawResponse, setRawResponse] = useState(null);

    useEffect(() => {
        if (!categoria) return;

        async function fetchProductos() {
            setLoading(true);
            setError(null);
            setRawResponse(null);

            try {
                // *** CAMBIO CLAVE AQUÍ: Construir la URL como una cadena ***
                // Esta URL será relativa y Netlify la interceptará.
                // Asegúrate que tu _redirects es: /api/* https://TU_URL_NGROK.ngrok-free.app/api/:splat 200
                let url = `/api/productos/filtro/con-imagenes?categoria=${encodeURIComponent(categoria)}`;

                if (categoriaDeProducto) {
                    url += `&categoriaDeProducto=${encodeURIComponent(categoriaDeProducto)}`;
                }

                console.log("URL de la petición:", url); // Para depuración

                const res = await fetch(url);

                console.log("Status:", res.status);
                const contentType = res.headers.get("content-type");
                console.log("Content-Type:", contentType);

                if (!res.ok) {
                    // Si la respuesta no es OK, lee el texto para ver si es el HTML de ngrok
                    const errorText = await res.text();
                    setRawResponse(errorText); // Guarda el HTML de ngrok aquí
                    throw new Error(`Error HTTP: ${res.status}. Respuesta: ${errorText.substring(0, 200)}...`);
                }

                if (!contentType || !contentType.includes("application/json")) {
                    // Si llega aquí, es un 200 OK pero no es JSON (probablemente el HTML de ngrok si el proxy falló)
                    const text = await res.text();
                    setRawResponse(text);
                    throw new Error(`Respuesta exitosa (200 OK) pero no JSON. Probable advertencia de ngrok. Contenido: ${text.substring(0, 200)}...`);
                }

                const data = await res.json();
                setProductos(Array.isArray(data) ? data : data.productos || []);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchProductos();
    }, [categoria, categoriaDeProducto]);

    return { productos, loading, error, rawResponse };
}