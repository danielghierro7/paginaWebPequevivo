import { useState } from "react";
import '../styles/global.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div
                    className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 drop-shadow-2xl tracking-wide select-none">
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
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 p-1 bg-gray-300 bg-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <span
                        className={`hamburger-bar w-6 h-0.5 bg-gray-700 block transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : '-translate-y-1.5'}`}></span>
                    <span className={`hamburger-bar w-6 h-0.5 bg-gray-700 block transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span
                        className={`hamburger-bar w-6 h-0.5 bg-gray-700 block transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : 'translate-y-1.5'}`}></span>
                </button>
            </div>

            {/* Menú móvil */}
            <div
                className={`md:hidden bg-white flex flex-col space-y-3 transition-all duration-300 overflow-hidden
                    ${isOpen
                    ? "h-auto py-4 opacity-100 pointer-events-auto"
                    : "h-0 py-0 opacity-0 pointer-events-none"
                }`}
            >
                <a href="/" className="block px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
                <a href="/ProductosEnVenta" className="block px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">Productos en Venta</a>
                <a href="/ProductosEnAlquiler" className="block px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">Productos en Alquiler</a>
                <a href="/contacto" className="block px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
            </div>
        </nav>
    );
}
