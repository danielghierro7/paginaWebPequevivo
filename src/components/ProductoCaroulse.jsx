import React, { useState } from "react";

export default function ProductoMediaCarousel({ imagenes = [], videos = [], nombre }) {
    const media = [
        ...imagenes
            .filter((img) => typeof img === "string" && img.trim() !== "")
            .map((img) => ({ type: "image", url: img })),
        ...videos
            .filter((vid) => typeof vid === "string" && vid.trim() !== "")
            .map((vid) => ({ type: "video", url: vid })),
    ];

    const [mediaIndex, setMediaIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const totalMedia = media.length;

    function prevMedia() {
        setMediaIndex((mediaIndex - 1 + totalMedia) % totalMedia);
    }

    function nextMedia() {
        setMediaIndex((mediaIndex + 1) % totalMedia);
    }

    if (totalMedia === 0)
        return <p className="text-center text-gray-500 italic">No hay medios disponibles</p>;

    const current = media[mediaIndex];

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative rounded-lg shadow-lg bg-black">
                {current.type === "image" ? (
                    <img
                        src={current.url}
                        alt={`${nombre} media ${mediaIndex + 1}`}
                        className="w-full h-64 object-cover cursor-pointer"
                        loading="lazy"
                        onClick={() => setShowModal(true)}
                    />
                ) : (
                    <video
                        key={current.url} // Fuerza reinicio cuando cambia la url
                        controls
                        autoPlay
                        className="w-full h-64 object-contain bg-black cursor-pointer"
                        preload="metadata"
                        playsInline
                        onClick={() => setShowModal(true)}
                    >
                        <source src={current.url} type="video/mp4" />
                        Tu navegador no soporta video.
                    </video>
                )}

                {totalMedia > 1 && (
                    <>
                        <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none">
                            <button
                                onClick={prevMedia}
                                className="pointer-events-auto bg-white bg-opacity-60 hover:bg-opacity-90 text-gray-700 rounded-full p-2 shadow transition"
                                aria-label="Medio anterior"
                            >
                                ◀
                            </button>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                            <button
                                onClick={nextMedia}
                                className="pointer-events-auto bg-white bg-opacity-60 hover:bg-opacity-90 text-gray-700 rounded-full p-2 shadow transition"
                                aria-label="Medio siguiente"
                            >
                                ▶
                            </button>
                        </div>
                    </>
                )}
            </div>
            <p className="mt-2 text-center text-sm text-gray-600">
                Medio {mediaIndex + 1} de {totalMedia}
            </p>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-4 right-4 text-white text-2xl font-bold"
                    >
                        ✕
                    </button>

                    {current.type === "image" ? (
                        <img
                            src={current.url}
                            alt={`${nombre} media grande`}
                            className="max-h-full max-w-full object-contain"
                        />
                    ) : (
                        <video
                            key={current.url} // También en el modal para forzar reinicio
                            controls
                            autoPlay
                            className="max-h-full max-w-full object-contain"
                        >
                            <source src={current.url} type="video/mp4" />
                            Tu navegador no soporta video.
                        </video>
                    )}
                </div>
            )}
        </div>
    );
}
