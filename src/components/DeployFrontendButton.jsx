// src/components/DeployFrontendButton.jsx
import React, { useState } from 'react';

const DeployFrontendButton = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        setMessage('Iniciando el reinicio de tu página web... Por favor, espera unos minutos.');

        try {

            const response = await fetch(`/api/productos/trigger-frontend-build`, {
                method: 'POST',
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
        <div style={{ marginTop: '30px', marginBottom: '30px', textAlign: 'center', padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            {/* Mensaje claro y sencillo */}
            <h2 style={{ fontSize: '1.8em', color: '#2c3e50', marginBottom: '15px' }}>
                Para que los cambios de tus productos se vean en la página web pública, debes **reiniciar la página**.
            </h2>

            <button
                onClick={handleClick}
                disabled={loading}
                style={{
                    padding: '12px 25px',
                    fontSize: '1em',
                    fontWeight: 'bold',
                    backgroundColor: loading ? '#95a5a6' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s ease, transform 0.2s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transform: loading ? 'scale(0.98)' : 'scale(1)',
                }}
            >
                {loading ? 'Reiniciando página web...' : '🚀 Reiniciar Página Web Ahora'}
            </button>
            {message && (
                <p
                    style={{
                        marginTop: '20px',
                        fontSize: '0.9em',
                        padding: '10px',
                        borderRadius: '5px',
                        backgroundColor: message.includes('Error') ? '#ffecec' : '#e6ffe6',
                        color: message.includes('Error') ? '#c0392b' : '#27ae60',
                        border: `1px solid ${message.includes('Error') ? '#c0392b' : '#27ae60'}`,
                        fontWeight: '600'
                    }}
                >
                    {message}
                </p>
            )}
            <p style={{ marginTop: '15px', fontSize: '0.8em', color: '#7f8c8d' }}>
                Este proceso puede tardar unos minutos. Una vez completado, tus productos actualizados aparecerán en el sitio.
            </p>
        </div>
    );
};

export default DeployFrontendButton;