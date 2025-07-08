
// src/components/DeployFrontendButton.jsx
import React, { useState } from 'react';

const DeployFrontendButton = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        setMessage('Iniciando el reinicio de tu página web... Por favor, espera unos minutos.');

        try {
            // La URL relativa '/api/productos/trigger-frontend-build' será interceptada por Netlify
            // y reenviada a tu backend en Render gracias a tu regla en _redirects.
            const response = await fetch(`https://backendpequevivo.onrender.com/api/productos/trigger-frontend-build`, {
                method: 'POST', // Asegúrate de que el método sea POST
            });

            if (response.ok) {
                const text = await response.text();
                setMessage(`✅ ¡Página web reiniciada! ${text} Tus cambios aparecerán pronto.`);
            } else {
                const errorText = await response.text();
                setMessage(`❌ Error al reiniciar la página web: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            setMessage(`❌ Error de conexión: ${error.message}. Asegúrate de que el sistema esté funcionando.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 mb-8 text-center p-6 bg-blue-50 rounded-lg shadow-lg">
            {/* Mensaje claro y sencillo para el usuario */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Para que los **cambios de tus productos** se vean en la **página web pública**, debes **reiniciar la página**.
            </h2>

            <button
                onClick={handleClick}
                disabled={loading}
                // Clases de Tailwind para el estilo del botón
                className={`py-3 px-6 text-base font-bold text-white rounded-lg shadow-md transition-all duration-200 ease-in-out
                           ${loading ? 'bg-gray-400 cursor-not-allowed opacity-70' : 'bg-green-600 hover:bg-green-700 active:scale-98'}`}
            >
                {loading ? 'Reiniciando página web...' : '🚀 Reiniciar Página Web Ahora'}
            </button>

            {/* Muestra el mensaje de estado si existe */}
            {message && (
                <p
                    // Clases de Tailwind para el estilo del mensaje de estado
                    className={`mt-5 text-sm p-3 rounded-md font-semibold
                               ${message.includes('Error')
                        ? 'bg-red-100 text-red-700 border border-red-500'
                        : 'bg-green-100 text-green-700 border border-green-500'
                    }`}
                >
                    {message}
                </p>
            )}
            <p className="mt-4 text-sm text-gray-500">
                Este proceso puede tardar unos minutos. Una vez completado, tus productos actualizados aparecerán en el sitio.
            </p>
        </div>
    );
};

export default DeployFrontendButton;