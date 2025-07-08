const categoria = 'Ventas';
const categoriaDeProducto = 'categoriaDeProducto';

const url = `/api/productos/filtro/ventas?categoria=${encodeURIComponent(categoria)}&categoriaDeProducto=${encodeURIComponent(categoriaDeProducto)}`;

const res = await fetch(url);
const productos = await res.json();
console.log(productos);
