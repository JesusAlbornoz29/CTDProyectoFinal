import React, { useState, useEffect } from "react";

const truncateText = (text, maxWords) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};

const Categorie = ({ handleFilterCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Hacer la solicitud a la API cuando el componente se monta
    fetch(`${import.meta.env.VITE_BACKEND_URL}productTypes`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []); // <- Agrega un array vacío como dependencia para ejecutar el efecto solo una vez

  const handleFilterChange = (category) => {
    // Llamar a la función onFilterChange con el tipo de producto seleccionado
    handleFilterCategory(category);
  };
  return (
    <div className="flex flex-wrap justify-center gap-6 mx-8">
      {categories.map((category) => (
        <div
          key={category.id}
          className="card bg-base-100 shadow-xl image-full w-72 h-40 bg-cover"
        >
          <figure className="bg-cover bg-center">
            {/* Utiliza directamente la cadena base64 como fuente de la imagen */}
            <img
              className="w-full"
              src={`data:image/png;base64,${category.productTypeImage}`}
              alt={category.description}
            />
          </figure>
          <div className="card-body h-40 p-4">
            <h2 className="card-title text-white">{category.description}</h2>
            <p className="text-primary-content text-[14px]">
              {truncateText(category.extraDescription, 8)}
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-accent btn-sm text-base-100"
                onClick={() => handleFilterChange(category.description)}
              >
                Ver Todos
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categorie;
