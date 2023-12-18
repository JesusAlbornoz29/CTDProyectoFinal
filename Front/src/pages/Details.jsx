/* eslint-disable react/no-unknown-property */
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackBtn from "../components/BackBtn";
import Carrousel from "../components/Carrousel";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/Global";
import Share  from "../components/Share";

export const Details = () => {
  const { isAdmin, isLoggedIn, logout } = useGlobalContext();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}products/${id}`
        );
        const productData = await response.json();
        setData(productData);
      } catch (error) {
        console.error("Error al cargar specs", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <section className="h-min w-full flex justify-center items-center flex-col bg-neutral ms:h-screen">
      <div className="mx-16 h-full mt-36 w-4/5">
        <div className="flex justify-between w-full mb-5">
          <div>
            <h1 className="text-4xl font-bold">{data && data.name}</h1>
            <p className="text-xl">{data && data.productType.description}</p>
          </div>
          <BackBtn />
        </div>
        <div
          id="Product_Images"
          className="max-h-[600px] sm:h-[400px] mb-8 sm:mb-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 h-full">
            {data && (
              <>
                {data.productImages.slice(0, 1).map((imagenProducto, index) => (
                  <React.Fragment key={index}>
                    <figure className="sm:w-1/2 sm:h-full h-[200px] overflow-hidden object-center rounded-md">
                      <img
                        className="min-w-full min-h-full object-cover"
                        src={`data:image/jpeg;base64, ${imagenProducto.productImage}`}
                        alt="Imagen Destacada Maquinaria Pro"
                      />
                    </figure>
                  </React.Fragment>
                ))}

                <div className="flex flex-col sm:w-1/2 gap-4 justify-start items-center">
                  <div className="flex max-h-40 sm:h-1/2 gap-4">
                    {data.productImages
                      .slice(1, 3)
                      .map((imagenProducto, index) => (
                        <React.Fragment key={index}>
                          <figure className="w-1/2 overflow-hidden object-center rounded-md">
                            <img
                              className="min-w-full min-h-full object-cover"
                              src={`data:image/jpeg;base64, ${imagenProducto.productImage}`}
                              alt="MaquinariaPro"
                            />
                          </figure>
                        </React.Fragment>
                      ))}
                  </div>
                  <div className="flex max-h-40 sm:h-1/2 gap-4">
                    {data.productImages
                      .slice(3, 5)
                      .map((imagenProducto, index) => (
                        <React.Fragment key={index}>
                          <figure className="w-1/2 overflow-hidden object-center rounded-md">
                            <img
                              className="min-w-full min-h-full object-cover"
                              src={`data:image/jpeg;base64, ${imagenProducto.productImage}`}
                              alt="MaquinariaPro"
                            />
                          </figure>
                        </React.Fragment>
                      ))}
                  </div>
                  <button
                    className="btn btn-outline btn-md max-w-[288px] min-w-fit "
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Ver todas las imagenes
                  </button>
                </div>
              </>
            )}
          </div>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box p-8">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  <span className="material-symbols-outlined">close_small</span>
                </button>
              </form>
              {data && data.productImages.length > 0 && (
                <Carrousel data={data && data.productImages} />
              )}
            </div>
          </dialog>
        </div>

        <div
          id="Product_Info"
          className="mt-4 flex flex-col-reverse md:flex-row-reverse md:gap-4 justify-center items-start"
        >
          <div className="mb-8 flex flex-col justify-center items-center w-full md:mt-4 md:w-1/3 md:min-w-[232px] md:sticky md:top-24">
            <h4 className="text-primary-content text-lg font-bold my-4 w-full text-center">
              ¿Quieres Resevar esta Máquina?
            </h4>
            <Link to={ isLoggedIn ? "/reservation/" + id : "/Login"}>
              <button className="btn text-neutral bg-primary btn-lg md:hover:text-primary m-auto">
                Reservar
                <span className="material-symbols-outlined">
                  assignment_turned_in
                </span>
              </button>
            </Link>
          </div>

          <div className="w-full md:w-2/3">
            <p className="mb-4 text-xl">
              Precio por dia: ${data && data.price}{" "}
            </p>
            <h2 className="text-primary text-3xl font-bold my-4">
              Descripción general del Equipo
            </h2>
            <p>{data && data.description}</p>
            <h3 className="text-primary text-xl font-bold my-4">
              Características de Máquina
            </h3>
            <ul className="mb-8">
              {data &&
                data.specs.map((spec, index) => {
                  return (
                    <li key={index} className=" mb-2">
                      <div className=" flex justify-start items-center gap-2 border-[1.5px] rounded-md px-2 py-1 max-w-fit border-secondary-content">
                        <span className="material-symbols-outlined">
                          {spec.icon}
                        </span>
                        <p>{spec.description}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <Share productName = {data && data.name} />
          </div>
        </div>
      </div>
    </section>
  );
};
