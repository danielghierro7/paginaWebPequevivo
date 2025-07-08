import { useState, useEffect } from "react";

export function useFetchProductos(categoria, categoriaDeProducto) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rawResponse, setRawResponse] = useState(null); // Guardar respuesta en texto para depurar

    useEffect(() => {
        if (!categoria) return;

        async function fetchProductos() {
            setLoading(true);
            setError(null);
            setRawResponse(null);

            try {
                const url = new URL(
                    "https://ecd3e2f1ea1e.ngrok-free.app/api/productos/filtro/con-imagenes"
                );
                url.searchParams.append("categoria", categoria);
                if (categoriaDeProducto) {
                    url.searchParams.append("categoriaDeProducto", categoriaDeProducto);
                }

                const res = await fetch(url.toString());

                console.log("Status:", res.status);
                const contentType = res.headers.get("content-type");
                console.log("Content-Type:", contentType);

                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }

                if (!contentType || !contentType.includes("application/json")) {
                    // Lee la respuesta como texto y guárdala para mostrarla
                    const text = await res.text();
                    setRawResponse(text);  // Guardamos la respuesta cruda para que puedas mostrarla
                    throw new Error(`Respuesta no JSON, se muestra el contenido HTML (o texto):`);
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
