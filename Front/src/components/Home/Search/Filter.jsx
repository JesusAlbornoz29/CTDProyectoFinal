export const Filter = ({ productTypes, handleFilterCategory }) => {
  const handleFilterChange = (productType) => {
    if (productType === "Todos") {
      handleFilterCategory(""); // Si se selecciona 'Todos', se pasa una cadena vacía para mostrar todos los productos
    } else {
      handleFilterCategory(productType); // Llamar a la función onFilterChange con el tipo de producto seleccionado
    }
  };

  return (
    <>
      <select
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        <option key="todos" value="Todos">
          Todos
        </option>
        {productTypes.map((productType) => (
          <option key={productType.id} value={productType.description}>
            {productType.description}
          </option>
        ))}
      </select>
    </>
  );
};
