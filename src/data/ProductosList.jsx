import { useState, useEffect } from "react";

export function useFetchProductos(categoria, categoriaDeProducto) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Ejecutando useEffect con categoria:", categoria, "categoriaDeProducto:", categoriaDeProducto);
        if (!categoria) return; // No hace fetch si no hay categoría

        async function fetchProductos() {
            setLoading(true);
            setError(null);

            try {
                const BASE_BACKEND_URL = "https://24aae5a65087.ngrok-free.app";

                const url = new URL("/api/productos/filtro/con-imagenes", BASE_BACKEND_URL);

                url.searchParams.append("categoria", categoria);
                if (categoriaDeProducto) {
                    url.searchParams.append("categoriaDeProducto", categoriaDeProducto);
                }

                console.log("Fetch URL:", url.toString());

                const res = await fetch(url.toString());
                if (!res.ok) throw new Error(`Error ${res.status}`);

                const data = await res.json();
                console.log("Datos recibidos:", data);

                // Si data es un array, lo usamos directamente, sino intentamos data.productos o vacio
                setProductos(Array.isArray(data) ? data : data.productos || []);
            } catch (err) {
                console.error("Error al hacer fetch:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProductos();
    }, [categoria, categoriaDeProducto]);

    return { productos, loading, error };
}
