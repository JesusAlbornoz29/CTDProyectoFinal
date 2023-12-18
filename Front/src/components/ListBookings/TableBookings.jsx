import { useState, useEffect } from "react";
import FileUploadForm from "../AddProducts/components/FileUploadForm";
import { Alerts } from "../../utils/Alerts";

export const TableBookings = () => {
  const [reservations, setresevations] = useState([]);
  const [formData, setFormData] = useState({
    product: {
      id: "",
    },
    user: {
      id: "",
    },
    startDate: "",
    endDate: "",
    extraData: "",
  });
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}reservations`)
      .then((response) => response.json())
      .then((data) => {
        setresevations(data); // Update this line
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al cargar product", error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div>
          <h1 className="text-3xl font-bold flex mb-8 justify-start">
            Todas las Reservas
          </h1>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <table className="table max-w-full">
            {/* head */}
            <thead>
              <tr>
                <th className=" w-2">ID</th>
                <th className=" w-4">Reserva</th>
                <th className=" w-4">Usuario</th>
                <th className=" w-4">Producto</th>
                <th className=" w-4">Fecha Inicio</th>
                <th className=" w-4">Fecha Fin</th>
                <th className=" w-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.slice(0, 7).map((booking) => (
                <tr key={booking.id}>
                  <th>{booking.id}
                  </th>
                  <td className="w-fit">
                  <p className="w-24 text-xs text-ellipsis overflow-hidden ...">
                            {booking.extraData}
                          </p>
                  </td>
                  <td>
                    <p className="w-48 truncate ... ">
                      {booking.user.username}
                    </p>
                  </td>
                  <td>
                    <p className="w-32 font-bold text-ellipsis overflow-hidden ...">
                      {booking.product.name}
                    </p>
                  </td>
                  <td>
                    <p className="w-20 truncate ... ">
                      {booking.startDate}
                    </p>
                  </td>
                  <td>
                    <p className="w-20 truncate ... ">{booking.endDate}</p>
                  </td>
                  <td>
                    <p
                      className={`w-24 truncate ${
                        booking.status === "PENDING"
                          ? "text-green-500 font-bold"
                          : ""
                      } ${
                        booking.status === "ACTIVE"
                          ? "text-yellow-500 font-bold"
                          : ""
                      } ${
                        booking.status === "FINISHED"
                          ? "text-red-500 font-bold"
                          : ""
                      }`}
                    >
                      {booking.status === "PENDING"
                        ? "RESERVADO"
                        : booking.status === "ACTIVE"
                        ? "EN PROCESO"
                        : booking.status === "FINISHED"
                        ? "FINALIZADO"
                        : booking.status}
                    </p>
                  </td>
                  <th></th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
