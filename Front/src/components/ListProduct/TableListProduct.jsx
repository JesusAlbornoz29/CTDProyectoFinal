import { useEffect, useState } from "react";
import { AgregarMaquina } from "./AgregarMaquina";
import Form from "./Form";
import { Spinner } from "../../utils/Spinner";

export const TableListProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [specs, setSpecs] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState({
    showConfirmation: false,
    showSuccess: false,
    productToDelete: null,
  });
  const openEditModal = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setEditingProduct(productToEdit);
    setShowModal(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    // Update the state with the edited product
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };
  const handleDeleteProduct = (productId) => {
    const categoryToDelete = products.find(
      (product) => product.id === productId
    );

    setDeleteStatus({
      showConfirmation: true,
      showSuccess: false,
      productToDelete: categoryToDelete,
    });
  };
  const handleDeleteConfirmation = (productId) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}products/${productId}`, {
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
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );

        setDeleteStatus({
          showConfirmation: false,
          showSuccess: true,
          productToDelete: null,
        });

        // Oculta el mensaje de éxito después de 3 segundos (3000 milisegundos)
        setTimeout(() => {
          setDeleteStatus({
            showConfirmation: false,
            showSuccess: false,
            productToDelete: null,
          });
        }, 2000);
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al cargar product", error);
      });

    fetch(`${import.meta.env.VITE_BACKEND_URL}specs`)
      .then((response) => response.json())
      .then((data) => {
        // Mapea solo las propiedades "description" de los objetos
        setSpecs(data);
      })
      .catch((error) => {
        console.error("Error al cargar specs", error);
      });
  }, [showModal, deleteProduct]);

  return (
    <>
      <div className="flex justify-center items-center min-h-fit flex-col">
        <div className="flex space-x-80 h-fit">
          <h1 className="text-3xl font-bold flex mb-8 justify-start ml-20	">
            Todas las Máquinas
          </h1>
          <AgregarMaquina />
        </div>
        <table className="table w-3/5 my-1">
          {/* head */}
          <thead>
            <tr>
              <th>
                <div className="flex">
                  <label className="mr-8">
                    <input type="checkbox" className="checkbox" />
                  </label>
                  <label>ID</label>
                </div>
              </th>
              <th className="flex">
                Imagen
                <div className="ml-12">Nombre</div>
              </th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products === undefined ? (
              <div className="col-span-2">No tenemos productos en stock</div>
            ) : products.length === 0 ? (
              <div className="flex justify-center w-full">
                <Spinner />
              </div>
            ) : (
              products.slice(0, 7).map((product) => (
                <tr key={product.id}>
                  <th>
                    <div className="flex">
                      <label className="mr-8">
                        <input type="checkbox" className="checkbox" />
                      </label>
                      <label>{product.id}</label>
                    </div>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              "data:image/png;base64," +
                              product.productImages?.[0]?.productImage
                            }
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div className="ml-8">
                        <div className="font-bold ml-8">{product.name}</div>
                        <div className="font-light ml-8">
                          {product.productType.description}
                        </div>
                        <div className="text-sm opacity-50 ml-8">
                          {product.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="truncate ... w-[220px]">
                      {product.description}
                    </p>
                  </td>
                  <th>
                    <p>${product.price}</p>
                  </th>
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
                        className="dropdown-content z-[4] menu p-2 shadow bg-base-100 rounded-box w-50"
                      >
                        <li>
                          <a
                            className="font-light"
                            onClick={() => {
                              openEditModal(product.id);
                              document.getElementById("my_modal_1").showModal();
                            }}
                          >
                            <span className="material-symbols-outlined">
                              edit_note
                            </span>{" "}
                            Editar
                          </a>
                          <dialog
                            id="my_modal_1"
                            className="modal justify-center items-center"
                          >
                            <div
                              className="modal-box"
                              style={{ maxWidth: "none", width: "auto" }}
                            >
                              {showModal &&
                                editingProduct &&
                                specs.length > 0 && (
                                  <Form
                                    editingProduct={editingProduct}
                                    onUpdateProduct={handleUpdateProduct}
                                    setShowModal={setShowModal}
                                    specs={specs}
                                  />
                                )}
                            </div>
                          </dialog>
                        </li>

                        <li>
                          <a
                            className="font-light text-red-700"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <span className="material-symbols-outlined">
                              delete_forever
                            </span>{" "}
                            Borrar
                          </a>
                        </li>
                      </ul>
                    </div>
                  </th>
                </tr>
              ))
            )}
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
              ¿Seguro qué deseas eliminar el producto{" "}
              {deleteStatus.productToDelete.name}?
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
                  handleDeleteConfirmation(deleteStatus.productToDelete.id)
                }
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>
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
          <span>Producto eliminada con éxito</span>
        </div>
      )}
    </>
  );
};
