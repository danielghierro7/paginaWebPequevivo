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
        <div className="flex flex-wrap justify-center gap-6">
            {productos.map(p => (
                <ProductoCard key={p.id} {...p} />
            ))}
        </div>
    );
}
