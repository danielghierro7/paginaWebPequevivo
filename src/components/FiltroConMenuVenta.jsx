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

            <nav className="mb-12 flex flex-wrap justify-center gap-4">
                {categoriasDeProducto.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategoriaDeProducto(cat)}
                        className={`px-6 py-4 rounded-lg font-semibold text-xl transition border-2
                            ${
                            categoriaDeProducto === cat
                                ? "bg-yellow-400 border-yellow-400 text-black shadow-lg"
                                : "bg-transparent border-gray-400 text-gray-800 hover:bg-yellow-100 hover:border-yellow-400"
                        }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </nav>

            <FiltroVentas categoria={categoria} categoriaDeProducto={categoriaDeProducto} />
        </div>
    );
}
