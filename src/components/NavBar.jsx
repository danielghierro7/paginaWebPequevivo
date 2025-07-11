import { useState } from "react";
import '../styles/global.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div
                    className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 drop-shadow-2xl tracking-wide select-none">
                    Pequevivo
                </div>

                {/* Menú grande */}
                <div className="hidden md:flex space-x-8">
                    <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
                    <a href="/ProductosEnVenta" className="text-gray-700 hover:text-blue-600 transition-colors">Productos
                        en Venta</a>
                    <a href="/ProductosEnAlquiler" className="text-gray-700 hover:text-blue-600 transition-colors">Productos
                        en Alquiler</a>
                    <a href="/contacto" className="text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
                </div>

                {/* Botón Hamburguesa */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 p-1 bg-gray-300 bg-opacity-30 rounded-md"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <span className={`hamburger-bar block ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`hamburger-bar block ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`hamburger-bar block ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
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
    );
}

