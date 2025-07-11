import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <style>
                {`
          /* Opcional: para iPhone y pantallas retina aseguramos contraste */
          @media screen and (max-width: 768px) and (-webkit-min-device-pixel-ratio: 2) {
            .hamburger-button {
              background-color: rgba(0, 0, 0, 0.4) !important;
            }
            .hamburger-button span {
              background-color: white !important;
            }
          }
        `}
            </style>

            <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 drop-shadow-2xl tracking-wide select-none">
                        Pequevivo
                    </div>

                    {/* Menú grande */}
                    <div className="hidden md:flex space-x-8">
                        <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
                        <a href="/ProductosEnVenta" className="text-gray-700 hover:text-blue-600 transition-colors">Productos en Venta</a>
                        <a href="/ProductosEnAlquiler" className="text-gray-700 hover:text-blue-600 transition-colors">Productos en Alquiler</a>
                        <a href="/contacto" className="text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
                    </div>

                    {/* Botón Hamburguesa */}
                    <button
                        className="hamburger-button md:hidden flex flex-col justify-between w-8 h-8 p-1 bg-black bg-opacity-20 rounded-md"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
            <span
                className={`block h-0.5 bg-white transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
            ></span>
                        <span
                            className={`block h-0.5 bg-white transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}
                        ></span>
                        <span
                            className={`block h-0.5 bg-white transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
                        ></span>
                    </button>
                </div>

                {/* Menú móvil */}
                <div
                    className={`md:hidden bg-white flex flex-col space-y-3 transition-all duration-300 overflow-hidden ${
                        isOpen
                            ? "px-4 pt-2 pb-4 max-h-screen opacity-100"
                            : "px-0 pt-0 pb-0 max-h-0 opacity-0"
                    }`}
                >
                    <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
                    <a href="/ProductosEnVenta" className="text-gray-700 hover:text-blue-600 transition-colors">Productos en Venta</a>
                    <a href="/ProductosEnAlquiler" className="text-gray-700 hover:text-blue-600 transition-colors">Productos en Alquiler</a>
                    <a href="/contacto" className="text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
                </div>
            </nav>
        </>
    );
}
