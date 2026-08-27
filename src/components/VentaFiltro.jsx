

import React from "react";
import { useFetchProductos } from "../data/ProductosList.jsx";
import ProductoCard from "./ProductoCard";
import ProductoCardSinPrecio from "./ProductoCardSinPrecio.jsx";

export default function FiltroVentas({ categoria, categoriaDeProducto }) {
    const { productos, loading, error } = useFetchProductos(categoria, categoriaDeProducto);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;
    if (productos.length === 0) return <p>No se encontraron productos.</p>;

    return (
        <div className="w-full px-2 sm:px-4 md:max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productos.map((p) => {
                    // Extraemos la descripción de forma segura
                    const descOriginal = p.descripcion || p.Descripcion || "";

                    // Detectamos si está vendido o reservado
                    const estaVendido = /vendido/i.test(descOriginal);
                    const estaReservado = /reservado/i.test(descOriginal);

                    // Limpiamos el texto borrando "vendido", "reservado" y el símbolo "¶"
                    const descripcionLimpia = descOriginal
                        .replace(/vendido/gi, "")
                        .replace(/reservado/gi, "")
                        .replace(/¶/g, "")
                        .trim();

                    // Preparamos el objeto con la descripción ya limpia y los estados explícitos
                    const productoProcesado = {
                        ...p,
                        descripcion: descripcionLimpia,
                        estaVendido,
                        estaReservado
                    };

                    return categoria === "alquiler" ? (
                        <ProductoCardSinPrecio key={p.id} {...productoProcesado} />
                    ) : (
                        <ProductoCard key={p.id} {...productoProcesado} />
                    );
                })}
            </div>
        </div>
    );
}