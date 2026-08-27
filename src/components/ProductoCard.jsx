import ProductoMediaCarousel from './ProductoCaroulse.jsx';

export default function ProductoCard(props) {
    // 1. Extraemos posibles nombres de variables que vengan del backend
    const rawNombre = props.nombre || props.Nombre || props.titulo || "";
    const rawPrecio = props.precio || props.Precio || "";
    const rawDesc = props.descripcion || props.Descripcion || props.detalles || "";
    const imagenes = props.imagenes || props.Imagenes || [];
    const videoUrl = props.videoUrl || props.VideoUrl || [];
    const videos = Array.isArray(videoUrl) ? videoUrl : [];

    // Convertimos todo a string por seguridad
    const textoNombre = String(rawNombre);
    const textoDesc = String(rawDesc);

    // 2. Buscamos VENDIDO o RESERVADO en el NOMBRE y en la DESCRIPCIÓN
    const textoCompleto = `${textoNombre} ${textoDesc}`;
    const estaVendido = props.estaVendido ?? /vendido/i.test(textoCompleto);
    const estaReservado = props.estaReservado ?? /reservado/i.test(textoCompleto);

    // 3. Limpiamos las palabras VENDIDO / RESERVADO de AMBOS textos
    const nombreLimpio = textoNombre
        .replace(/vendido/gi, '')
        .replace(/reservado/gi, '')
        .replace(/¶/g, '')
        .trim();

    const descripcionLimpia = textoDesc
        .replace(/vendido/gi, '')
        .replace(/reservado/gi, '')
        .replace(/¶/g, '')
        .trim();

    const whatsappNumber = "34654197649";
    const whatsappMessage = `Hola, estoy interesado en el producto: ${nombreLimpio}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="producto-card max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white p-6 text-center">
            <ProductoMediaCarousel imagenes={imagenes} videos={videos} nombre={nombreLimpio} />

            {/* Título/Nombre limpio */}
            <h3 className="font-extrabold text-3xl mt-6 text-gray-900">{nombreLimpio}</h3>

            {/* Descripción limpia (si existe) */}
            {descripcionLimpia && (
                <p className="text-xl text-gray-600 mt-2">{descripcionLimpia}</p>
            )}

            {/* Muestra VENDIDO / RESERVADO al final en rojo o el precio */}
            {estaVendido ? (
                <p className="text-3xl font-black text-red-600 mt-3 tracking-wider uppercase">
                    VENDIDO
                </p>
            ) : estaReservado ? (
                <p className="text-3xl font-black text-amber-500 mt-3 tracking-wider uppercase">
                    RESERVADO
                </p>
            ) : (
                <p className="text-2xl font-bold text-green-700 mt-2">€{rawPrecio}</p>
            )}

            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition"
                aria-label={`Contactar por WhatsApp sobre el producto ${nombreLimpio}`}
            >
                Ver producto
            </a>
        </div>
    );
}