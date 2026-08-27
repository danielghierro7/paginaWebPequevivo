import ProductoMediaCarousel from './ProductoCaroulse.jsx';

export default function ProductoCard({ id, nombre, precio, descripcion = "", imagenes = [], videoUrl = [] }) {
    const videos = Array.isArray(videoUrl) ? videoUrl : [];

    const whatsappNumber = "34654197649";
    const whatsappMessage = `Hola, estoy interesado en el producto con ID: ${nombre}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // 1. Detecta "vendido" o "reservado" sin importar mayúsculas/minúsculas
    const estaVendido = /vendido/i.test(descripcion);
    const estaReservado = /reservado/i.test(descripcion);

    // 2. Borra la palabra "Vendido" (y "Reservado") del texto de la descripción
    const descripcionLimpia = descripcion
        .replace(/vendido|reservado/gi, '')
        .replace(/¶/g, ' ')
        .trim();

    return (
        <div className="producto-card max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white p-6 text-center">
            <ProductoMediaCarousel imagenes={imagenes} videos={videos} nombre={nombre} />

            <h3 className="font-extrabold text-3xl mt-6 text-gray-900">{nombre}</h3>

            {/* AQUÍ SE PINTA EL TEXTO LIMPIO SIN "Vendido" */}
            <p className="text-xl text-gray-600 mt-2">{descripcionLimpia}</p>

            {/* AQUÍ SE MUESTRA EL ESTADO EN ROJO O EL PRECIO */}
            {estaVendido ? (
                <p className="text-3xl font-black text-red-600 mt-3 tracking-wider uppercase">
                    VENDIDO
                </p>
            ) : estaReservado ? (
                <p className="text-3xl font-black text-amber-500 mt-3 tracking-wider uppercase">
                    RESERVADO
                </p>
            ) : (
                <p className="text-2xl font-bold text-green-700 mt-2">€{precio}</p>
            )}

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