import { useEffect, useState } from "react";
import FileUploadForm from "../components/AddProducts/components/FileUploadForm";
import SelectCharacters from "../components/AddProducts/components/SelectedCharacters";
import { Alerts } from "../utils/Alerts";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [prductTypes, setPrductTypes] = useState([]);
  const [Alert, setAlert] = useState({
    color: "",
    text: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: 1,
    productType: undefined,
    brand: { id: 0, description: "" },
    specs: {},
    productImages: [],
  });
  let formDataToSend = {};

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}productTypes`)
      .then((response) => response.json())
      .then((data) => {
        setPrductTypes(data);
      })
      .catch((error) => {
        console.error("Error al cargar productTypes", error);
      });

    // Cargar las opciones de specs desde localhost:8081/specs
    fetch(`${import.meta.env.VITE_BACKEND_URL}specs`)
      .then((response) => response.json())
      .then((data) => {
        // Mapea solo las propiedades "description" de los objetos
        setCategorias(data);
      })
      .catch((error) => {
        console.error("Error al cargar specs", error);
      });
  }, []);

  const updateSpecs = (newSpecs) => {
    setFormData({
      ...formData,
      specs: newSpecs,
    });
  };

  const handleFileUpload = (file) => {
    const updatedFiles = [...files, file];
    setFiles(updatedFiles);

    const updatedFormData = { ...formData, productImages: updatedFiles };
    setFormData(updatedFormData);

    const convertImagesToBase64 = () => {
      const base64DataArray = [];
      const imagePromises = updatedFormData.productImages.map((imageFile) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onload = (event) => {
            const base64Data = event.target.result.split(",")[1];
            base64DataArray.push(base64Data);
            resolve();
          };
          reader.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setFormData({ ...formData, productImages: base64DataArray });
        })
        .catch((error) => {
          console.error("Error al convertir imágenes a Base64:", error);
        });
    };

    convertImagesToBase64();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      setAlert({
        color: "bg-error",
        text: "El nombre no puede estar vacío",
      });
      setShowAlert(true);
      return;
    }

    if (formData.productImages.length < 1) {
      setAlert({
        color: "bg-error",
        text: "Debes agregar al menos una imagen",
      });
      setShowAlert(true);
      return;
    }

    if (!formData.description) {
      setAlert({
        color: "bg-error",
        text: "La descripción no puede estar vacía",
      });
      setShowAlert(true);
      return;
    }

    if (!formData.price) {
      setAlert({
        color: "bg-error",
        text: "El precio no puede estar vacío",
      });
      setShowAlert(true);
      return;
    }

    if (!formData.brand) {
      setAlert({
        color: "bg-error",
        text: "Debes seleccionar una marca",
      });
      setShowAlert(true);
      return;
    }

    formDataToSend = {
      name: formData.name,
      price: parseInt(formData.price),
      description: formData.description,
      stock: parseInt(formData.stock),
      productType: {
        id: parseInt(formData.productType || "1"),
      },
      brand: {
        description: formData.brand.description,
      },
      specs: formData.specs.map((spec) => ({
        id: parseInt(spec),
      })),
      productImages: formData.productImages.map((image) => ({
        productImage: image,
      })),
    };

    try {
      fetch(`${import.meta.env.VITE_BACKEND_URL}products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            data.message &&
            data.message.indexOf("Ya existe un producto con el mismo nombre") >
              -1
          ) {
            setAlert({
              color: "bg-error",
              text: `Ya existe un producto con el mismo nombre: ${formData.name}`,
            });
            setShowAlert(true);
          } else {
            console.log("Success:", data);
            setAlert({
              color: "bg-success",
              text: "Se ha agregado correctamente",
            });
            setShowAlert(true);
          }
        });
    } catch (error) {
      setAlert({
        color: "bg-error",
        text: "Error al agregar la máquina",
      });
      setShowAlert(true);
    }
  };

  const submitAndOut = (e) => {
    e.preventDefault();
    handleSubmit(e);
    navigate("/");
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  return (
    <article className="bg-neutral min-h-[80vh] flex justify-center items-center py-[90px] flex-col gap-4">
      {showAlert && (
        <Alerts
          text={Alert.text}
          bgColorClass={Alert.color}
          duration={2000}
          onDismiss={handleDismissAlert}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 flex justify-center flex-col w-3/5 gap-4 p-8 py-16 rounded-lg"
      >
        <h1 className=" flex text-4xl font-bold justify-center">
          Agregar una Máquina
        </h1>
        <div className="flex-col py-8">
          <label htmlFor="">Nombre de la Máquina</label>
          <input
            type="text"
            placeholder="Nombre Común de la Máquina"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input w-full input-bordered placeholder:text-secondary-content"
          />
        </div>
        <p>Imágenes (Recomendado 5 Imágenes mínimo)</p>
        <FileUploadForm handleFileUpload={handleFileUpload} />
        <div className="flex flex-col py-8">
          <label htmlFor="">Descripción de la Máquina</label>
          <textarea
            type="text"
            placeholder="Agregá la descripción aquí"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="textarea textarea-bordered textarea-md w-full placeholder:text-secondary-content"
          ></textarea>
        </div>
        <div className="flex gap-4 w-full justify-start">
          <div className="flex flex-col w-1/3">
            <label htmlFor="">Precio de Renta por día</label>
            <input
              type="number"
              placeholder="Precio / día"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="input input-bordered w-full max-w-xs placeholder:text-secondary-content"
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="categoria">Categoría de Máquina</label>
            <select
              className="select select-bordered w-full max-w-xs"
              name="categoria"
              value={formData.productType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  productType: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Seleccione una categoría
              </option>
              {prductTypes.map((categoria, index) => (
                <option key={index} value={categoria.id}>
                  {categoria.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 w-full justify-start">
          <div className="flex-col w-1/3 mb-8">
            <label htmlFor="">Marca de la Máquina</label>
            <input
              type="text"
              placeholder="Marca de Producto"
              value={formData.brand.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  brand: { description: e.target.value },
                })
              }
              className="input input-bordered w-full max-w-xs placeholder:text-secondary-content"
            />
          </div>
          <div className="flex-col w-1/3">
            <label htmlFor="">Stock:</label>
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="input input-bordered w-full max-w-xs placeholder:text-secondary-content"
              readOnly
            />
          </div>
        </div>
        <div className="flex gap-3 mb-4">
          <div className=" flex flex-col gap-2">
            <label htmlFor="">
              Características de la Máquina
              <br />{" "}
              <span className=" text-sm italic">
                (Selecciona todas las que apliquen)
              </span>
            </label>
            <SelectCharacters specs={categorias} updateSpecs={updateSpecs} />
          </div>
        </div>
        <div className="flex justify-end w-full gap-4">
          <button className="btn w-52" onClick={submitAndOut}>
            Agregar y salir
          </button>
          <button
            type="submit"
            className="btn bg-primary w-52 text-neutral hover:text-gray-100"
          >
            Agregar
          </button>
        </div>
      </form>
    </article>
  );
}
