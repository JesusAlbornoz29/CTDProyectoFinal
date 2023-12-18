import React from 'react';

const ProductCard = (props) => {
  const {
    id,
    nombre,
    precio,
    descripcion,
    stock,
    tipoProducto,
    marcaProducto,
    imagenProductos,
  } = props;

  return (
  <div className="card bg-base-100 shadow-xl items-center rounded-md border overflow-hidden">
    {/* Poner que sea imagenProducto[0] hover:imagenProducto[1] en el src */}
  <figure className='w-full rounded-none'><img className='w-full object-contain' src={imagenProductos[1].ruta} alt={imagenProductos[1].ruta} /></figure>
  <div className="card-body w-full p-4">
    <h2 className="card-title">
    {nombre}
    </h2>
    <p>Descripción: {descripcion}</p>
    <p>Precio: ${precio}</p>
    <p>Tipo de producto: {tipoProducto.descripcion || 'No especificado'}</p>
    <p>Marca del producto: {marcaProducto.descripcion || 'No especificada'}</p>

    <div className="card-actions justify-end">
      <div className='badge badge-outline'>{stock ? 'Tiene stock' : 'Sin stock'} </div>
    </div>
  </div>
</div>
  );
};

export default ProductCard;
