import { useState } from "react";

const categorias = [
    {
        title: "Castillos Hinchables",
        image: "/CastilloInicio.jpg",
        description:
            "Diversión asegurada para los más pequeños con nuestros castillos hinchables de la mejor calidad.",
    },
    {
        title: "Toro Mecánico",
        image: "/Toro.jpg",
        description:
            "Siente la adrenalina y la diversión con nuestro toro mecánico para eventos.",
    },
    {
        title: "Castillos Acuáticos",
        image: "/acuatico.jpg",
        description:
            "Atracciones acuáticas refrescantes para las mejores fiestas de verano.",
    },
    {
        title: "Cañón De Espuma",
        image: "/Cañon.jpg",
        description:
            "Diversión con espuma garantizada con nuestro cañón para fiestas inolvidables.",
    },
    {
        title: "Deportivos",
        image: "/Diana.jpg",
        description:
            "Atracciones deportivas para eventos activos y llenos de energía.",
    },
];

export default function Categorias() {
    const [flippedIndex, setFlippedIndex] = useState(null);

    const toggleFlip = (index) => {
        setFlippedIndex(flippedIndex === index ? null : index);
    };

    return (
        <section className="max-w-7xl mx-auto my-16 px-6">
            <h2 className="text-4xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
                ¿Con qué trabajamos?
            </h2>

            <div className="grid grid-cols-3 gap-8">
                {/* Fila de arriba: 3 categorías */}
                {categorias.slice(0, 3).map(({ title, image, description }, index) => (
                    <div
                        key={index}
                        tabIndex="0"
                        role="button"
                        onClick={() => toggleFlip(index)}
                        className="relative w-full h-72 perspective cursor-pointer"
                    >
                        <div
                            className={`relative w-full h-full duration-700 transform-style-preserve-3d ${
                                flippedIndex === index ? "rotate-y-180" : ""
                            }`}
                        >
                            {/* Front side */}
                            <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4">
                                    <h3 className="text-lg font-semibold text-yellow-400">
                                        {title}
                                    </h3>
                                </div>
                            </div>

                            {/* Back side */}
                            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-black bg-opacity-90 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                                    {title}
                                </h3>
                                <p className="text-white">{description}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Fila de abajo: 2 categorías centradas */}
                {categorias.slice(3).map(({ title, image, description }, index) => (
                    <div
                        key={index + 3} // clave única
                        tabIndex="0"
                        role="button"
                        onClick={() => toggleFlip(index + 3)}
                        className={`relative w-full h-72 perspective cursor-pointer ${
                            index === 0 ? "col-start-2" : "col-start-3"
                        }`}
                    >
                        <div
                            className={`relative w-full h-full duration-700 transform-style-preserve-3d ${
                                flippedIndex === index + 3 ? "rotate-y-180" : ""
                            }`}
                        >
                            {/* Front side */}
                            <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4">
                                    <h3 className="text-lg font-semibold text-yellow-400">
                                        {title}
                                    </h3>
                                </div>
                            </div>

                            {/* Back side */}
                            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-black bg-opacity-90 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                                    {title}
                                </h3>
                                <p className="text-white">{description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
        </section>
    );
}
