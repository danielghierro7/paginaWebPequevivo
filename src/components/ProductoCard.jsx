
import ProductoMediaCarousel from './ProductoCaroulse.jsx';

export default function ProductoCard(props) {
    // 1. Desestructuración con fallback (por si en la API vienen las claves con Mayúscula)
    const {
        nombre = props.Nombre || "",
        precio = props.Precio || "",
        imagenes = props.Imagenes || [],
        videoUrl = props.VideoUrl || []
    } = props;

    // Capturamos cualquier variante de la descripción
    const descRaw = props.descripcion || props.Descripcion || props.detalles || "";
    const textoDesc = String(descRaw); // Forzamos a String por seguridad

    const videos = Array.isArray(videoUrl) ? videoUrl : [];

    const whatsappNumber = "34654197649";
    const whatsappMessage = `Hola, estoy interesado en el producto con ID: ${nombre}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // 2. Comprobación insensible a mayúsculas y minúsculas
    const estaVendido = props.estaVendido ?? /vendido/i.test(textoDesc);
    const estaReservado = props.estaReservado ?? /reservado/i.test(textoDesc);

    // 3. Limpieza de texto: elimina "vendido", "reservado" y caracteres especiales
    const descripcionLimpia = textoDesc
        .replace(/vendido/gi, '')
        .replace(/reservado/gi, '')
        .replace(/¶/g, '')
        .trim();

    return (
        <div className="producto-card max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white p-6 text-center">
            <ProductoMediaCarousel imagenes={imagenes} videos={videos} nombre={nombre} />

            <h3 className="font-extrabold text-3xl mt-6 text-gray-900">{nombre}</h3>

            {/* Muestra la descripción sin la palabra VENDIDO ni RESERVADO */}
            <p className="text-xl text-gray-600 mt-2">{descripcionLimpia}</p>

            {/* Muestra el estado en rojo/naranja al final o el precio */}
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