import React, { useState } from "react";
import FiltroVentas from "./VentaFiltro.jsx";

const categoriasDeProducto = [
    "Todas",
    "Castillos Hinchables",
    "Toro Mecánico",
    "Castillos Acuáticos",
    "Cañón De Espuma",
    "Deportivos",
    "Salón Para Eventos"
];

export default function FiltroConMenuVenta() {
    const categoria = "ventas";
    const [categoriaDeProducto, setCategoriaDeProducto] = useState("Todas");

    return (
        <div className="text-center">
            <p className="mb-6 text-3xl font-bold text-gray-800">
                Seleccione la categoría:
            </p>

            <div className="mb-12 inline-block relative">
                <select
                    value={categoriaDeProducto}
                    onChange={(e) => setCategoriaDeProducto(e.target.value)}
                    className="appearance-none w-64 bg-white border border-gray-400 hover:border-yellow-400 px-4 py-3 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:border-yellow-400 text-xl"
                >
                    {categoriasDeProducto.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M5.516 7.548a.625.625 0 0 1 .884 0L10 11.147l3.6-3.6a.625.625 0 1 1 .884.884l-4 4a.625.625 0 0 1-.884 0l-4-4a.625.625 0 0 1 0-.884z" />
                    </svg>
                </div>
            </div>

            <FiltroVentas
                categoria={categoria}
                categoriaDeProducto={categoriaDeProducto}
            />
        </div>
    );
}
