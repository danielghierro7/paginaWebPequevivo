import React, { useState } from "react";

const AdminProductoMedia = () => {
    const [productoNombre, setProductoNombre] = useState("");
    const [imagenes, setImagenes] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const BASE_BACKEND_URL = "https://24aae5a65087.ngrok-free.app";

    const handleUpload = async () => {
        if (!productoNombre.trim()) {
            alert("Por favor, ingresa el nombre del producto");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        imagenes.forEach((imagen) => formData.append("imagenes", imagen));
        videos.forEach((video) => formData.append("videos", video));

        try {
            const response = await fetch(
                `${BASE_BACKEND_URL}/api/productos/${encodeURIComponent(productoNombre)}/media`,
                {
                    method: "PUT",
                    body: formData,
                }
            );

            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error(error);
            alert("Error al subir fotos y videos");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAll = async () => {
        if (!productoNombre.trim()) {
            alert("Por favor, ingresa el nombre del producto");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${BASE_BACKEND_URL}/api/productos/${encodeURIComponent(productoNombre)}/media`,
                {
                    method: "DELETE",
                }
            );

            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error(error);
            alert("Error al eliminar fotos y videos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Gestión de Medios de Producto</h2>

            <div className="mb-4">
                <label>Nombre del producto:</label>
                <input
                    type="text"
                    value={productoNombre}
                    onChange={(e) => setProductoNombre(e.target.value)}
                    className="border p-2 ml-2"
                />
            </div>

            <div className="mb-4">
                <label>Selecciona imágenes:</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImagenes(Array.from(e.target.files))}
                    className="ml-2"
                />
            </div>

            <div className="mb-4">
                <label>Selecciona videos:</label>
                <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => setVideos(Array.from(e.target.files))}
                    className="ml-2"
                />
            </div>

            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={loading}
            >
                {loading ? "Procesando..." : "Subir Fotos y Videos"}
            </button>

            <div className="mt-8 mb-4">
                <button
                    onClick={handleDeleteAll}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                    disabled={loading}
                >
                    {loading ? "Procesando..." : "Eliminar TODAS las Fotos y Videos"}
                </button>
            </div>
        </div>
    );
};

export default AdminProductoMedia;
