import React from "react";
import { useFetchProductos } from "../data/ProductosList.jsx";
import ProductoCard from "./ProductoCard";

export default function FiltroVentas({ categoria, categoriaDeProducto }) {
    const { productos, loading, error } = useFetchProductos(categoria, categoriaDeProducto);

    console.log("Renderizando FiltroVentas");  // <- Esto para saber que el componente se renderiza

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;
    if (productos.length === 0) return <p>No se encontraron productos.</p>;

    return (
        <div className="w-full px-2 sm:px-4 md:max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productos.map((p) => (
                    <ProductoCard key={p.id} {...p} />
                ))}
            </div>
        </div>
    );
}
