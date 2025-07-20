
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categoriasTipoTransaccion = [
    "alquiler",
    "ventas"
];

const categoriasDeProducto = [
    "Todas",
    "Castillos Hinchables",
    "Toro Mecánico",
    "Castillos Acuáticos",
    "Cañón De Espuma",
    "Deportivos",
    "Salón Para Eventos"
];

const ProductoForm = () => {
    const [busqueda, setBusqueda] = useState('');
    const [producto, setProducto] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        categoriaDeProducto: '',
        stock: '',
    });

    const [archivosImagen, setArchivosImagen] = useState([]);
    const [archivosVideo, setArchivosVideo] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const obtenerSiguienteNombre = async () => {
            try {
                const res = await axios.get('/api/productos/ultimoNombre');
                const ultimoNombre = res.data || '000';

                const siguienteNumero = String(parseInt(ultimoNombre, 10) + 1).padStart(3, '0');

                if (!producto.id) {
                    setProducto((prev) => ({
                        ...prev,
                        nombre: siguienteNumero
                    }));
                }
            } catch (err) {
                console.error('Error obteniendo siguiente número de producto:', err);
                setError('Error obteniendo siguiente número.');
            }
        };

        obtenerSiguienteNombre();
    }, []);

    const buscarProducto = async () => {
        setError(null);
        setSuccess(null);

        if (!busqueda.trim()) {
            setError('Introduce un nombre o ID para buscar.');
            return;
        }

        try {
            const res = await axios.get(`/api/productos/buscar?nombre=${encodeURIComponent(busqueda.trim())}`);
            setProducto({
                id: res.data.id || '',
                nombre: res.data.nombre || '',
                descripcion: res.data.descripcion || '',
                precio: res.data.precio !== undefined ? res.data.precio.toString() : '',
                categoria: res.data.categoria || '',
                categoriaDeProducto: res.data.categoriaDeProducto || '',
                stock: res.data.stock !== undefined ? res.data.stock.toString() : '',
            });
            setSuccess('✅ Producto cargado para editar');
        } catch (err) {
            setError('❌ No se encontró el producto');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        if (!producto.nombre.trim()) {
            setError('El nombre es obligatorio.');
            return;
        }

        const formData = new FormData();

        const productoParaEnviar = {
            nombre: producto.nombre.trim(),
            descripcion: producto.descripcion.trim(),
            precio: parseFloat(producto.precio) || 0,
            categoria: producto.categoria,
            categoriaDeProducto: producto.categoriaDeProducto,
            stock: parseInt(producto.stock, 10) || 0,
        };

        formData.append('producto', JSON.stringify(productoParaEnviar));

        archivosImagen.forEach((archivo) => {
            formData.append('imagenes', archivo);
        });

        archivosVideo.forEach((archivo) => {
            formData.append('videos', archivo);
        });

        try {
            if (producto.id) {
                await axios.put(`/api/productos/${producto.id}`, formData);
                setSuccess('✅ Producto editado con éxito');
            } else {
                await axios.post('/api/productos', formData);
                setSuccess('✅ Producto creado con éxito');
            }

            setProducto({
                id: '',
                nombre: '',
                descripcion: '',
                precio: '',
                categoria: '',
                categoriaDeProducto: '',
                stock: '',
            });
            setArchivosImagen([]);
            setArchivosVideo([]);
        } catch (err) {
            setError('❌ Error al guardar: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center' }}>Buscar Producto</h2>
            <input
                type="text"
                placeholder="Nombre o ID"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ width: '100%', padding: 8, marginBottom: 10 }}
            />
            <button
                type="button"
                onClick={buscarProducto}
                style={{
                    width: '100%',
                    padding: 10,
                    marginBottom: 20,
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                }}
            >
                Buscar
            </button>

            <form
                onSubmit={handleSubmit}
                style={{ border: '1px solid #ddd', borderRadius: 8, padding: '1rem' }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    {producto.id ? 'Editar Producto' : 'Crear Producto'}
                </h2>

                <label>Nombre (Número):</label>
                <input
                    type="text"
                    value={producto.nombre}
                    readOnly
                    style={{ width: '100%', padding: 8, marginBottom: 10 }}
                />

                <label>Descripción:</label>
                <textarea
                    placeholder="Descripción"
                    value={producto.descripcion}
                    onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })}
                    style={{ width: '100%', padding: 8, marginBottom: 10, minHeight: 60 }}
                />

                <label>Precio:</label>
                <input
                    type="number"
                    placeholder="Precio"
                    value={producto.precio}
                    onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
                    style={{ width: '100%', padding: 8, marginBottom: 10 }}
                    step="0.01"
                    min="0"
                />

                <label>Tipo de Transacción:</label>
                <select
                    value={producto.categoria}
                    onChange={(e) => setProducto({ ...producto, categoria: e.target.value })}
                    style={{ width: '100%', padding: 8, marginBottom: 10 }}
                >
                    <option value="">Seleccionar</option>
                    {categoriasTipoTransaccion.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <label>Categoría de Producto:</label>
                <select
                    value={producto.categoriaDeProducto}
                    onChange={(e) => setProducto({ ...producto, categoriaDeProducto: e.target.value })}
                    style={{ width: '100%', padding: 8, marginBottom: 10 }}
                >
                    <option value="">Seleccionar</option>
                    {categoriasDeProducto.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <label>Stock:</label>
                <input
                    type="number"
                    placeholder="Stock"
                    value={producto.stock}
                    onChange={(e) => setProducto({ ...producto, stock: e.target.value })}
                    style={{ width: '100%', padding: 8, marginBottom: 10 }}
                    min="0"
                />

                <label>Imágenes:</label>
                <input
                    type="file"
                    multiple
                    onChange={(e) => setArchivosImagen(Array.from(e.target.files))}
                    accept="image/*"
                    style={{ marginBottom: 10 }}
                />

                <label>Videos:</label>
                <input
                    type="file"
                    multiple
                    onChange={(e) => setArchivosVideo(Array.from(e.target.files))}
                    accept="video/*"
                    style={{ marginBottom: 20 }}
                />

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: 10,
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                    }}
                >
                    {producto.id ? 'Guardar Cambios' : 'Crear Producto'}
                </button>

                {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
                {success && <p style={{ color: 'green', marginTop: 10 }}>{success}</p>}
            </form>
        </div>
    );
};

export default ProductoForm;
