import ProductoMediaCarousel from './ProductoCaroulse.jsx';

export default function ProductoCard({ id, nombre, precio, descripcion, imagenes = [], videoUrl = [] }) {
    const videos = Array.isArray(videoUrl) ? videoUrl : [];

    // Enlace de WhatsApp con mensaje que incluye el ID del producto
    const whatsappNumber = "34654197649"; // con el prefijo +34 para España
    const whatsappMessage = `Hola, estoy interesado en el producto con ID: ${nombre}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="producto-card max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white p-6 text-center">
            <ProductoMediaCarousel imagenes={imagenes} videos={videos} nombre={nombre} />

            <h3 className="font-extrabold text-3xl mt-6 text-gray-900">{nombre}</h3>
            <p className="text-xl text-gray-600 mt-2">{descripcion}</p>
            <p className="text-2xl font-bold text-green-700 mt-2">€{precio}</p>

            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition"
                aria-label={`Contactar por WhatsApp sobre el producto ${nombre} para comprarlo`}
            >
                Ver producto
            </a>
        </div>
    );
}
