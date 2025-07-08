import React from "react";
import { useFetchProductos } from "../data/ProductosList.jsx";
import ProductoCard from "./ProductoCard";
const { productos, loading, error, rawResponse } = useFetchProductos("Ventas", "Todas");

if (loading) return <p>Cargando...</p>;

if (error)
    return (
        <div>
            <p>Error: {error}</p>
            {rawResponse && (
                <details style={{ whiteSpace: "pre-wrap", maxHeight: "300px", overflow: "auto", border: "1px solid red" }}>
                    <summary>Mostrar respuesta cruda</summary>
                    <code>{rawResponse}</code>
                </details>
            )}
        </div>
    );

return (
    <div>
        {productos.map((p) => (
            <div key={p.id}>
                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>
                {/* y demás */}
            </div>
        ))}
    </div>
);
