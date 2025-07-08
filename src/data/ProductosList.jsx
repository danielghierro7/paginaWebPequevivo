import { useState, useEffect } from "react";

export function useFetchProductos(categoria, categoriaDeProducto) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!categoria) {
            console.log("❌ No hay categoría, no se hace fetch");
            return;
        }

        const BASE_BACKEND_URL = "https://24aae5a65087.ngrok-free.app";
        const PATH = "/api/productos/filtro/con-imagenes";

        const fetchProductos = async () => {
            console.log("🚀 Fetching productos...", { categoria, categoriaDeProducto });

            setLoading(true);
            setError(null);

            try {
                // 👇 Construir URL ABSOLUTA SIEMPRE
                const url = new URL(PATH, BASE_BACKEND_URL);
                url.searchParams.append("categoria", categoria);
                if (categoriaDeProducto) {
                    url.searchParams.append("categoriaDeProducto", categoriaDeProducto);
                }

                console.log("🌍 URL final:", url.toString());

                const res = await fetch(url.toString());

                if (!res.ok) {
                    throw new Error(`Error ${res.status} - ${res.statusText}`);
                }

                // 👇 Verificar que la respuesta es JSON
                const contentType = res.headers.get("content-type") || "";
                if (!contentType.includes("application/json")) {
                    throw new Error(`Respuesta no es JSON: content-type=${contentType}`);
                }

                const data = await res.json();

                console.log("✅ Datos recibidos:", data);

                // 👇 Siempre devolver array válido
                setProductos(Array.isArray(data) ? data : data.productos || []);
            } catch (err) {
                console.error("❌ Error en fetch:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [categoria, categoriaDeProducto]);

    return { productos, loading, error };
}
