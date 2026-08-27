import ProductoMediaCarousel from './ProductoCaroulse.jsx';

export default function ProductoCard(props) {
    // 1. Lectura segura de propiedades (evita fallos si vienen en mayúsculas desde la API)
    const nombre = props.nombre || props.Nombre || "";
    const precio = props.precio || props.Precio || "";
    const imagenes = props.imagenes || props.Imagenes || [];
    const videoUrl = props.videoUrl || props.VideoUrl || [];
    const videos = Array.isArray(videoUrl) ? videoUrl : [];

    // 2. Extraer y forzar la descripción a texto
    const descBruta = props.descripcion || props.Descripcion || props.detalles || "";
    const textoDescripcion = String(descBruta);

    // 3. Comprobar si incluye VENDIDO o RESERVADO (sin importar mayúsculas/minúsculas)
    const estaVendido = props.estaVendido ?? /vendido/i.test(textoDescripcion);
    const estaReservado = props.estaReservado ?? /reservado/i.test(textoDescripcion);

    // 4. ELIMINAR las palabras del texto para que NO salgan en negro dentro de la descripción
    const descripcionLimpia = textoDescripcion
        .replace(/vendido/gi, "")
        .replace(/reservado/gi, "")
        .replace(/¶/g, "")
        .trim();

    const whatsappNumber = "34654197649";
    const whatsappMessage = `Hola, estoy interesado en el producto: ${nombre}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="producto-card max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white p-6 text-center">
            <ProductoMediaCarousel imagenes={imagenes} videos={videos} nombre={nombre} />

            <h3 className="font-extrabold text-3xl mt-6 text-gray-900">{nombre}</h3>

            {/* Texto de la descripción SIN las palabras VENDIDO / RESERVADO */}
            <p className="text-xl text-gray-600 mt-2">{descripcionLimpia}</p>

            {/* Bloque destacado en Rojo para VENDIDO o Ámbar para RESERVADO */}
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
                aria-label={`Contactar por WhatsApp sobre el producto ${nombre}`}
            >
                Ver producto
            </a>
        </div>
    );
}