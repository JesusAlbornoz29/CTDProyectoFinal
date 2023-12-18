/* eslint-disable react/no-unknown-property */
import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BackBtn from "../components/BackBtn";
import Datepicker from "react-tailwindcss-datepicker";
import { sendEmail } from "../utils/send-email";
import { ReservationPolitics } from "../components/ReservationPolitics";

export const Reservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dataUser = JSON.parse(localStorage.getItem("userDto"));

  const refBoton = useRef(null);

  const [data, setData] = useState(null);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
    extraInfo: "",
  });

  const [reservations, setReservations] = useState([]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleExtraInfo = (e) => {
    const element = e.target;
    setValue(Object.assign({}, value, { extraInfo: element.value }));
  };

  useEffect(() => {
    const btn = refBoton.current;

    if (btn) {
      if (value.startDate !== null && value.endDate !== null) {
        btn.classList.remove("btn-disabled");
      } else {
        btn.classList.add("btn-disabled");
      }
    }
  }, [value, refBoton]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}products/${id}`
        );
        const productData = await response.json();
        setData(productData);
        setReservations(
          productData.reservations.map(({ endDate, startDate }) => ({
            endDate,
            startDate,
          }))
        );
      } catch (error) {
        console.error("Error al cargar specs", error);
      }
    };

    fetchProductData();
  }, []);

  const body = {
    product: {
      id: Number(id),
    },
    user: {
      id: localStorage.getItem("userDto")
        ? JSON.parse(localStorage.getItem("userDto")).id
        : null,
    },
    startDate: value.startDate,
    endDate: value.endDate,
    extraData: value.extraInfo,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_BACKEND_URL + "reservations/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/confirma-reserva");
          return response.json();
        } else {
          // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
          throw new Error("Error en la solicitud");
        }
      })
      .then((dataResponse) => {
        const { userDto } = localStorage;
        const userData = JSON.parse(userDto);
        const templateId = "template_lw3vxbg";
        sendEmail(
          { ...dataResponse, ...userData, name: data.name },
          templateId
        );
      })
      .catch((error) => {
        console.error(error);
        /*       setAlert({
            color: "bg-error",
            text: "No pudimos crear el usuario",
          });
          // **Update showAlert state to true**
          setShowAlert(true);
          return; */
      });
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <section className="w-full flex justify-center items-center flex-col bg-neutral">
      <div className="mx-16 h-full mt-36 mb-24 w-4/5">
        <div className="flex justify-between w-full mb-5">
          <div>
            <h1 className="text-2xl font-bold">{data && data.name}</h1>
            <p className="text-xl">{data && data.productType.description}</p>
          </div>
          <BackBtn />
        </div>
        <div
          id="Product_Images"
          className="max-h-[600px] lg:h-[400px] mb-8 lg:mb-4"
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 lg:mt-16 h-full justify-center items-center">
            {data && (
              <>
                {data.productImages.slice(0, 1).map((imagenProducto, index) => (
                  <React.Fragment key={index}>
                    <figure className="lg:w-1/2 lg:h-full h-[200px] overflow-hidden object-center rounded-md">
                      <img
                        className="min-w-full min-h-full object-cover"
                        src={`data:image/jpeg;base64, ${imagenProducto.productImage}`}
                        alt="Imagen Destacada Maquinaria Pro"
                      />
                    </figure>
                  </React.Fragment>
                ))}

                <div className="flex flex-col lg:w-1/2 gap-4 items-center w-96">
                  <h3 className="text-primary text-2xl font-bold my-4 w-full text-center mt-0">
                    Reserva esta Máquina
                  </h3>
                  <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 rounded-lg py-2">
                    <form
                      className="card-body justify-between w-96"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex gap-2">
                        <div className="flex-col">
                          <label className="text-sm" htmlFor="">
                            Nombre
                          </label>
                          <input
                            type="text"
                            className="input input-sm input-bordered w-full max-w-xs text-sm text-primary-content"
                            value={dataUser.firstName}
                            disabled
                          />
                        </div>
                        <div className="flex-col">
                          <label className="text-sm" htmlFor="">
                            Apellido
                          </label>
                          <input
                            type="text"
                            className="input input-sm input-bordered w-full max-w-xs text-sm text-primary-content"
                            value={dataUser.lastName}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="flex-col">
                        <label className="text-sm" htmlFor="">
                          Email Registrado:
                        </label>
                        <input
                          type="text"
                          className="input input-sm input-bordered w-full max-w-xs text-sm text-primary-content"
                          value={dataUser.username}
                          disabled
                        />
                      </div>
                      <div className="flex-col">
                        <label htmlFor="">Fecha</label>
                        <Datepicker
                          minDate={formattedDate}
                          startFrom={formattedDate}
                          disabledDates={reservations}
                          value={value}
                          onChange={handleValueChange}
                          i18n={"es"}
                          popoverDirection="down"
                          placeholder={"Cuáles fechas?"}
                          separator={" → "}
                          displayFormat={"DD/MM/YY"}
                          primaryColor={"yellow"}
                          startWeekOn="mon"
                          showFooter={true}
                          configs={{
                            footer: {
                              cancel: "Cancelar",
                              apply: "Aplicar",
                            },
                          }}
                        />
                      </div>

                      <div className="form-control mt-4">
                        <label htmlFor="" className="mb-2">
                          Algo a tener en cuenta?
                        </label>
                        <textarea
                          type="text"
                          placeholder="Ejemplo: Indicación para dirección de entrega"
                          onChange={handleExtraInfo}
                          className="textarea textarea-bordered textarea-md w-full placeholder:text-[#6a7282] text-primary-content bg-[#1E293B]"
                        ></textarea>
                      </div>
                      <div className="form-control mt-6">
                        <button
                          className="btn btn-disabled text-neutral bg-primary md:hover:text-primary m-auto min-w[240px]"
                          type="submit"
                          ref={refBoton}
                        >
                          Reservar Ahora
                          <span className="material-symbols-outlined">
                            assignment_turned_in
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ReservationPolitics />
    </section>
  );
};
