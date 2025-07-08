import { useState, useEffect } from "react";

export function useFetchProductos(categoria, categoriaDeProducto) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!categoria) return;

        async function fetchProductos() {
            setLoading(true);
            setError(null);

            try {
                const url = new URL("https://24aae5a65087.ngrok-free.app/api/productos/filtro/con-imagenes");
                url.searchParams.append("categoria", categoria);
                if (categoriaDeProducto) {
                    url.searchParams.append("categoriaDeProducto", categoriaDeProducto);
                }

                const res = await fetch(url.toString());

                // Mostrar código estado y content-type para diagnosticar
                console.log("Status:", res.status);
                const contentType = res.headers.get("content-type");
                console.log("Content-Type:", contentType);

                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }

                // Comprobar que la respuesta es JSON
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await res.text(); // leer la respuesta como texto (HTML u otro)
                    throw new Error(`Respuesta no JSON:\n${text.substring(0, 300)}`); // muestra los primeros 300 caracteres para diagnóstico
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

    return { productos, loading, error };
}
