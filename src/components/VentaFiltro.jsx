import React from "react";
import { useFetchProductos } from "../data/ProductosList.jsx";
import ProductoCard from "./ProductoCard";
import ProductoCardSinPrecio from "./ProductoCardSinPrecio.jsx"; // <-- importa tu componente especial

export default function FiltroVentas({ categoria, categoriaDeProducto }) {
    const { productos, loading, error } = useFetchProductos(categoria, categoriaDeProducto);

    console.log("Renderizando FiltroVentas");

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;
    if (productos.length === 0) return <p>No se encontraron productos.</p>;

    return (
        <div className="w-full px-2 sm:px-4 md:max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productos.map((p) => (
                    categoria === "alquiler" ? (
                        <ProductoCardSinPrecio key={p.id} {...p} />
                    ) : (
                        <ProductoCard key={p.id} {...p} />
                    )
                ))}
            </div>
        </div>
    );
}
