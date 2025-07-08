"use client";

import { useState } from "react";

export default function DeleteProductoForm() {
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("ventas"); // valor por defecto en minúscula

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://ecd3e2f1ea1e.ngrok-free.app/api/productos/${encodeURIComponent(nombre)}/${encodeURIComponent(categoria)}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                alert("Producto eliminado correctamente ✅");
                setNombre("");
                setCategoria("ventas");
            } else {
                alert("Error al eliminar el producto ❌");
            }
        } catch (error) {
            console.error(error);
            alert("Error en la petición ❌");
        }
    };

    return (
        <form onSubmit={handleDelete} className="flex flex-col gap-4 max-w-md mx-auto p-4 border rounded">
            <h2 className="text-xl font-bold">Eliminar producto</h2>

            <label className="flex flex-col">
                Nombre:
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="border p-2"
                />
            </label>

            <label className="flex flex-col">
                Categoría:
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                    className="border p-2"
                >
                    <option value="ventas">ventas</option>
                    <option value="alquiler">alquiler</option>
                </select>
            </label>

            <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Eliminar Producto
            </button>
        </form>
    );
}
