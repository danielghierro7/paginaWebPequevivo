import React from "react";
import ProductoMediaCarousel from './ProductoCaroulse.jsx';

export default function ProductoCard({ id, nombre, precio, descripcion, imagenes = [], videoUrl = [] }) {
    const videos = Array.isArray(videoUrl) ? videoUrl : [];

    // Convertimos todo a minúsculas para no depender de mayúsculas/minúsculas
    const descripcionLower = descripcion.toLowerCase();

    const estaVendido = descripcionLower.includes("vendido");
    const estaReservado = descripcionLower.includes("reservado");

    return (
        <div className="producto-card max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white p-6 text-center">
            {/* Carrusel de imágenes y videos */}
            <ProductoMediaCarousel imagenes={imagenes} videos={videos} nombre={nombre} />

            {/* Nombre del producto */}
            <h3 className="font-extrabold text-3xl mt-6 text-gray-900">{nombre}</h3>

            {/* Mostrar VENDIDO o RESERVADO o descripción normal */}
            {estaVendido ? (
                <h2 className="text-5xl font-extrabold text-red-600 animate-pulse mt-4">
                    VENDIDO
                </h2>
            ) : estaReservado ? (
                <h2 className="text-5xl font-extrabold text-yellow-500 animate-pulse mt-4">
                    RESERVADO
                </h2>
            ) : (
                <p className="text-xl text-gray-600 mt-2">{descripcion}</p>
            )}

            {/* Precio */}
            <p className="text-2xl font-bold text-green-700 mt-2">{precio}€</p>

            {/* Botón solo si NO está vendido ni reservado */}
            {!estaVendido && !estaReservado && (
                <a
                    href={`/productos/${id}`}
                    className="inline-block mt-6 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition"
                    aria-label={`Ver detalles del producto ${nombre}`}
                >
                    Ver producto
                </a>
            )}
        </div>
    );
}
