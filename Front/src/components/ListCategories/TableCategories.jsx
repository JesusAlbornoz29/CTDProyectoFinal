import { useState, useEffect } from "react";
import FileUploadForm from "../AddProducts/components/FileUploadForm";
import { Alerts } from "../../utils/Alerts";
import Form from "../ListCategories/Form";
export const TableCategories = () => {
  const [productType, setProductType] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [editingProductType, setEditingProductType] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState({
    showConfirmation: false,
    showSuccess: false,
    categoryToDelete: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    extraDescription: "",
    productTypeImage: [], // Mantén esto como un array vacío
  });
  let formDataToSend = {};
  const [Alert, setAlert] = useState({
    color: "",
    text: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const openEditModal = (productTypeId) => {
    const productTypeToEdit = productType.find(
      (productType) => productType.id === productTypeId
    );
    setEditingProductType(productTypeToEdit);
    setShowModal(true);
    console.log(productTypeToEdit, productType, productTypeId);
  };
  const handleUpdateCategoria = (updatedProductType) => {
    setProductTypes((prevProductTypes) =>
      prevProductTypes.map((productTypes) =>
        productTypes.id === updatedProductType.id
          ? updatedProductType
          : productType
      )
    );
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}productTypes`)
      .then((response) => response.json())
      .then((data) => {
        setProductType(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al cargar product", error);
      });
  }, [showModal,productType]);

  const handleFileUpload = (file) => {
    const updatedFiles = [...files, file];
    setFiles(updatedFiles);

    const updatedFormData = { ...formData, productTypeImage: updatedFiles };
    setFormData(updatedFormData);

    const convertImagesToBase64 = () => {
      const base64DataArray = [];
      const imagePromises = updatedFormData.productTypeImage.map(
        (imageFile) => {
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
        }
      );

      Promise.all(imagePromises)
        .then(() => {
          setFormData({ ...formData, productTypeImage: base64DataArray });
        })
        .catch((error) => {
          console.error("Error al convertir imágenes a Base64:", error);
        });
    };

    convertImagesToBase64();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description) {
      setAlert({
        color: "bg-error",
        text: "El nombre no puede estar vacío",
      });
      setShowAlert(true);
      return;
    }

    if (formData.productTypeImage.length < 1) {
      setAlert({
        color: "bg-error",
        text: "Debes agregar al menos una imagen",
      });
      setShowAlert(true);
      return;
    }

    if (!formData.extraDescription) {
      setAlert({
        color: "bg-error",
        text: "La descripción no puede estar vacía",
      });
      setShowAlert(true);
      return;
    }

    formDataToSend = {
      description: formData.description,
      extraDescription: formData.extraDescription,
      productTypeImage: formData.productTypeImage.length > 0
        ? formData.productTypeImage[0]  
        : null,
 };
    try {
      fetch(`${import.meta.env.VITE_BACKEND_URL}productTypes/create`, {
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
            data.message.indexOf("Ya existe una categoria con el mismo nombre") >
              -1
          ) {
            setAlert({
              color: "bg-error",
              text: `Ya existe una categoria con el mismo nombre: ${formData.description}`,
            });
            setShowAlert(true);
          } else {
            setProductType((prevProductType) => [...prevProductType, data]);
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
        text: "Error al agregar la categoria",
      });
      setShowAlert(true);
    }
  };

  const submitAndOut = (e) => {
    e.preventDefault();
    handleSubmit(e);
    navigate("/");
  };

 
  const handleDeleteProduct = (productTypeId) => {
    const categoryToDelete = productType.find(
      (product) => product.id === productTypeId
    );

    setDeleteStatus({
      showConfirmation: true,
      showSuccess: false,
      categoryToDelete: categoryToDelete,
    });
  };

  const handleDeleteConfirmation = (productTypeId) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}productTypes/${productTypeId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return {};
        }
      })
      .then((data) => {
        // Actualiza el estado productType eliminando la categoría
        setProductType((prevProductType) =>
          prevProductType.filter((product) => product.id !== productTypeId)
        );

        setDeleteStatus({
          showConfirmation: false,
          showSuccess: true,
          categoryToDelete: null,
        });

        // Oculta el mensaje de éxito después de 3 segundos (3000 milisegundos)
        setTimeout(() => {
          setDeleteStatus({
            showConfirmation: false,
            showSuccess: false,
            categoryToDelete: null,
          });
        }, 2000);
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  };
  

  const handleDismissAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <div>
          <div className=" flex justify-between">
            <h1 className="text-3xl font-bold flex mb-8 justify-start	">
              Todas las Categorias
            </h1>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn bg-primary text-black "
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              + Crear Nueva Categoría
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg text-center">
                  Crear Nueva Categoría
                </h3>
                <div className="modal-action">
                  {showAlert && (
                    <Alerts
                      text={Alert.text}
                      bgColorClass={Alert.color}
                      duration={2000}
                      onDismiss={handleDismissAlert}
                    />
                  )}
                  <form onSubmit={handleSubmit} method="dialog">
                    <div className="flex">
                      <div className="flex flex-col mr-6">
                        <div className="flex-col py-8">
                          <label htmlFor="">Nombre de la categoria</label>
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
                      <FileUploadForm handleFileUpload={handleFileUpload} />
                    </div>
                    <div className="flex justify-end w-full gap-4 mt-8">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                      <button
                        type="submit"
                        className="btn bg-primary w-52 text-neutral hover:text-gray-100"
                      >
                        Agregar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          <table className="table w-3/5">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <div className="flex">
                    <label className="mr-8">
                      <label>ID</label>
                    </label>
                  </div>
                </th>
                <th className="flex">
                  Imagen
                  <div className="ml-6">Título de Categoría</div>
                </th>
                <th className="relative bottom-1">Descripción</th>
                <th className="relative bottom-1">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productType.slice(0, 7).map((product) => (
                <tr key={product.id}>
                  <th>
                    <div className="flex">
                      <label className="mr-8">
                        <label>{product.id}</label>
                      </label>
                    </div>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={`data:image/png;base64,${product.productTypeImage}`}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div className="ml-8">
                        <div className="font-bold ml-8">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="w-[220px] truncate ... ">
                      {product.extraDescription}
                    </p>
                  </td>
                  <th>
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn m-1 bg-inherit border-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-5 h-15 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          ></path>
                        </svg>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[4] menu p-2 shadow bg-base-100 rounded-box w-50 font-thin mb-1"
                      >
                        <li className="flex items-center justify-center">
                          {/* Open the modal using document.getElementById('ID').showModal() method */}

                          {/* Open the modal using document.getElementById('ID').showModal() method */}
                          <button
                            className="btn bg-transparent border-none w-5 no-hover h-5 font-thin capitalize text-base hover:bg-transparent "
                            onClick={() => {
                              openEditModal(product.id);
                              document.getElementById("my_modal_2").showModal();
                            }}
                          >
                            <svg
                              width="20"
                              height="22"
                              viewBox="0 0 20 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 22V18H20V22H0ZM4 14H5.4L13.2 6.225L11.775 4.8L4 12.6V14ZM2 16V11.75L13.2 0.575C13.3833 0.391667 13.5958 0.25 13.8375 0.15C14.0792 0.05 14.3333 0 14.6 0C14.8667 0 15.125 0.05 15.375 0.15C15.625 0.25 15.85 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15833 18 3.425C18 3.675 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L6.25 16H2Z"
                                fill="#CDCED0"
                              />
                              <path
                                d="M0 22V18H20V22H0ZM4 14H5.4L13.2 6.225L11.775 4.8L4 12.6V14ZM2 16V11.75L13.2 0.575C13.3833 0.391667 13.5958 0.25 13.8375 0.15C14.0792 0.05 14.3333 0 14.6 0C14.8667 0 15.125 0.05 15.375 0.15C15.625 0.25 15.85 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15833 18 3.425C18 3.675 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L6.25 16H2Z"
                                fill="black"
                                fill-opacity="0.2"
                              />
                            </svg>{" "}
                            Editar
                          </button>
                          <dialog
                            id="my_modal_2"
                            className="modal flex justify-center"
                          >
                            <div className="modal-box">
                              {showModal && "editingProductType" && (
                                <Form
                                  editingProductType={editingProductType}
                                  onUpdateProductType={handleUpdateCategoria}
                                  setShowModal={setShowModal}
                                />
                              )}

                              <div className="modal-action">
                                <form method="dialog"></form>
                              </div>
                            </div>
                          </dialog>
                        </li>
                        <li>
                          <a
                            className="text-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="18"
                              viewBox="0 0 16 18"
                              fill="none"
                            >
                              <path
                                d="M5.4 13.5L8 10.9L10.6 13.5L12 12.1L9.4 9.5L12 6.9L10.6 5.5L8 8.1L5.4 5.5L4 6.9L6.6 9.5L4 12.1L5.4 13.5ZM3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3Z"
                                fill="#FF4343"
                              />
                            </svg>
                            Borrar
                          </a>
                        </li>
                      </ul>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {deleteStatus.showConfirmation && (
            <div
              role="alert"
              className="alert fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-1/2 w-3/4 p-4 rounded shadow-md z-[10000] text-white flex justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{ stroke: "red" }}
                className="shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                ¿Seguro qué deseas eliminar la categoría{" "}
                {deleteStatus.categoryToDelete.description}?
              </span>
              <div>
                <button
                  className="btn btn-sm"
                  onClick={() =>
                    setDeleteStatus({
                      ...deleteStatus,
                      showConfirmation: false,
                    })
                  }
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-sm bg-red-500 text-white"
                  onClick={() =>
                    handleDeleteConfirmation(deleteStatus.categoryToDelete.id)
                  }
                >
                  Aceptar
                </button>
              </div>
            </div>
          )}

          {deleteStatus.showSuccess && (
            <div
              role="alert"
              className="alert alert-success fixed top-6 left-1/2 transform -translate-x-1/2 alert p-4 rounded shadow-md z-[10000] sm:w-1/2 w-3/4 text-white flex justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Categoría eliminada con éxito</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};




