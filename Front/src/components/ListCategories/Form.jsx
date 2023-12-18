import React, { useState, useEffect } from "react";
import FileUploadForm from "../AddProducts/components/FileUploadForm";
import { Alerts } from "../../utils/Alerts";
export default function Form({
  editingProductType,
  OnUpdateProductType,
  setShowModal,
}) {
  const [formData, setFormData] = useState({ ...editingProductType });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (editingProductType) {
      setFormData({ ...editingProductType });
    }
  }, [editingProductType]);

  const handleFileUpload = (file) => {
    setFiles([...files, file]);
    setFormData({ ...formData, productTypeImage: [...files, file] });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formDataToSend = {
      description: formData.description,
      extraDescription: formData.extraDescription,
      productTypeImages:
        formData.productTypeImage.length > 0
          ? formData.productTypeImage[0]
          : null,
    };

    const url = `${import.meta.env.VITE_BACKEND_URL}productTypes/${
      editingProductType.id
    }`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      console.log("Respuesta del servidor:", res);

      if (!res.ok) {
        const errorResponse = await res.json(); // Intenta leer el cuerpo del error
        console.error("Error en la solicitud:", errorResponse);
        return;
      }

      const updatedProductType = await res.json();
      console.log("Success:", updatedProductType);

      // Call the callback function to update the state in the parent component
      onUpdateProduct(updatedProductType);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  return (
    
    <form method="dialog" onSubmit={handleSubmit}>
      
      <div className="flex">
        <div className="flex flex-col mr-6">
          <div className="flex-col py-8">
            <label htmlFor="">Nombre de la Categoria</label>
            <input
              type="text"
              placeholder="Nombre Común de la Máquina"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="input w-full input-bordered placeholder:text-secondary-content"
            />
            <label htmlFor="">Descripcion de la categoria</label>
            <textarea
              type="text"
              placeholder="Agregá la descripción aquí"
              value={formData.extraDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  extraDescription: e.target.value,
                })
              }
              className="textarea textarea-bordered textarea-md w-full placeholder:text-secondary-content"
            ></textarea>
          </div>
        </div>
        
        
      </div>
      <div className="flex justify-end w-full gap-4 mt-8">
        <button
          type="submit"
          className="btn bg-primary w-52 text-neutral hover:text-gray-100"
        >
          Editar
        </button>
        <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <span className="material-symbols-outlined">close_small</span>
        </button>
      </form>
      </div>
    </form>
  );
}
// handleFileUpload={handleFileUpload}
