import { useState, useEffect } from "react";
import FileUploadForm from "../AddProducts/components/FileUploadForm";
import useApi from "../../hooks/hookApi";
import SelectCharacters from "../AddProducts/components/SelectedCharacters";
import { Alerts } from "../../utils/Alerts";

function Form({ editingProduct, onUpdateProduct, setShowModal, specs }) {
  const [categorias, setCategorias] = useState([]);
  const [Alert, setAlert] = useState({
    color: "",
    text: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ ...editingProduct });

  useEffect(() => {
    if (editingProduct) {
      setFormData({ ...editingProduct });
    }
  }, [editingProduct]);

  const { data } = useApi(
    `${import.meta.env.VITE_BACKEND_URL}productTypes`,
    {}
  );

  useEffect(() => {
    if (data) {
      setCategorias(data);
    }
  }, [data]);

  const handleFileUpload = (file) => {
    setFiles([...files, file]);
    setFormData({ ...formData, imagenProductos: [...files, file] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      name: formData.name,
      price: parseInt(formData.price),
      description: formData.description,
      stock: parseInt(formData.stock),
      productType: {
        id: parseInt(
          formData.productType.id
            ? formData.productType.id
            : formData.productType
        ),
      },
      brand: {
        description: formData.brand.description,
      },
      specs: formData.specs.map((spec) => ({
        id: parseInt(spec.id),
      })),
      productImages: (formData.productImages || []).map((image) => ({
        productImage: image.productImage,
      })),
    };

    const url = `${import.meta.env.VITE_BACKEND_URL}products/${
      editingProduct.id
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
        console.error("Error en la solicitud. Estado:", res.status);
        setAlert({
          color: "bg-error",
          text: "Error al editar la máquina",
        });
        setShowAlert(true);
        return;
      }

      const updatedProduct = await res.json();
      console.log("Success:", updatedProduct);
      setAlert({
        color: "bg-success",
        text: "Se ha editado correctamente",
      });
      setShowAlert(true);

      // Call the callback function to update the state in the parent component
      onUpdateProduct(updatedProduct);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setAlert({
        color: "bg-error",
        text: "Error al editar la máquina",
      });
      setShowAlert(true);
    }
  };

  const updateSpecs = (newSpecs) => {
    setFormData({
      ...formData,
      specs: newSpecs,
    });
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center min-w-full">
      {showAlert && (
        <Alerts
          text={Alert.text}
          bgColorClass={Alert.color}
          duration={2000}
          onDismiss={handleDismissAlert}
        />
      )}
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <span className="material-symbols-outlined">close_small</span>
        </button>
      </form>
      <form onSubmit={handleSubmit}>
        <div className="form flex flex-col">
          <div className="mb-8">
            <p>Nombre de la Maquina</p>
            <input
              type="text"
              placeholder="Nombre de la Maquina"
              className="input input-bordered w-full max-w-screen-md"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="mb-9">
            <p className="mb-9 flex">
              Imágenes{" "}
              <div className="ml-1 text-gray-500">
                {" "}
                (Recomendado 5 Imágenes mínimo)
              </div>
            </p>

            <FileUploadForm
              handleFileUpload={handleFileUpload}
              images={formData.productImages}
            />
          </div>

          <div className="mb-8 w-full ">
            <p>Descripción de la Máquina</p>
            <input
              type="text"
              placeholder="Agregá la descripción aquí"
              className="input input-bordered w-screen max-w-2xl  pt-5 pr-48 pb-20"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex">
            <div className="flex flex-col w-80">
              <p>Precio de Renta por día </p>
              <input
                type="text"
                placeholder="$"
                className="input input-bordered w-full max-w-xs"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col ml-10 w-80">
              <p>Categoría de Máquina</p>
              <select
                className="select select-bordered w-full max-w-xs"
                value={formData.productType.description}
                onChange={(e) => {
                  setFormData({ ...formData, productType: e.target.value });
                }}
              >
                <option disabled value="">
                  Seleccione una categoría
                </option>
                {categorias.map((categoria, index) => (
                  <option key={index} value={categoria.id}>
                    {categoria.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col ml-10 w-80">
              <p>Marca de la Máquina</p>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={formData.brand.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    brand: {
                      ...formData.brand.description,
                      description: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col mb-9 mt-11 ">
            <p className="mb-3 flex ">
              Caracteristicas de la Máquina{" "}
              <div className="ml-1 text-gray-500">
                (Selecciona todas las que apliquen)
              </div>
            </p>
            <SelectCharacters
              dataSpecs={formData.specs}
              specs={specs}
              updateSpecs={updateSpecs}
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="bg-primary rounded-lg w-40 py-2 text-black mr-5 cursor-pointer"
            type="submit"
          >
            Guardar Cambios{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
