import { useState, useEffect } from "react";

export const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState({
    showConfirmation: false,
    showSuccess: false,
    userToDelete: null,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error al cargar users", error);
      });
  }, []);

  const obtenerUsuarioActual = () => {
    const idUsuarioActual = localStorage.getItem("userDto")
      ? JSON.parse(localStorage.getItem("userDto")).id
      : null;

    return idUsuarioActual;
  };

  const handleRoleChange = (userId, currentRole) => {
    const currentUser = obtenerUsuarioActual();

    if (currentUser && currentUser.id === userId) {
      console.warn("No puedes cambiar tu propio rol.");
      return;
    }

    setSelectedUserId(userId);
    setNewRole(currentRole);
  };

  const handleSelectChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleConfirmRoleChange = () => {
    if (newRole && (newRole === "USER" || newRole === "ADMIN")) {
      fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }users/${selectedUserId}/role?newRole=${newRole}`,
        {
          method: "PUT",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          console.log(
            `Rol cambiado con éxito para el usuario ${selectedUserId}`
          );

          return fetch(`${import.meta.env.VITE_BACKEND_URL}users`);
        })
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error(
            "Error al obtener la lista de usuarios actualizada",
            error
          );
        })
        .finally(() => {
          setSelectedUserId(null);
          setNewRole("");
        });
    }
  };

  const handleDeleteUser = (userId) => {
    // Mostrar confirmación antes de eliminar
    setDeleteStatus({
      showConfirmation: true,
      showSuccess: false,
      categoryToDelete: { id: userId },
    });
  };

  const handleDeleteConfirmation = (userId) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(`Usuario ${userId} eliminado con éxito`);
        setDeleteStatus({
          ...deleteStatus,
          showConfirmation: false,
          showSuccess: true,
        });

        return fetch(`${import.meta.env.VITE_BACKEND_URL}users`);
      })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setTimeout(() => {
          setDeleteStatus({
            showConfirmation: false,
            showSuccess: false,
            categoryToDelete: null,
          });
        }, 2000);
      })
      .catch((error) => {
        console.error(
          "Error al obtener la lista de usuarios actualizada",
          error
        );
      })
      .finally(() => {
        setSelectedUserId(null);
        setNewRole("");
      });
  };

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <div>
          <div className="flex mr-9">
            <h1 className="text-3xl font-bold flex mb-8 justify-start right-1/4 ml-20	">
              Todos los usuarios
            </h1>
          </div>
          <table className="table w-3/5">
            <thead>
              <tr>
                <th>
                  <div className="flex">
                    <label className="mr-8">
                      <label>ID</label>
                    </label>
                  </div>
                </th>
                <th className="relative bottom-1">Nombre de usuario</th>
                <th className="relative bottom-1">Nombre completo</th>
                <th className="relative bottom-1">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 7).map((user) => (
                <tr key={user.id}>
                  <th>
                    <div className="flex">
                      <label className="mr-8">
                        <label>{user.id}</label>
                      </label>
                    </div>
                  </th>
                  <td>
                    <p className="w-[220px]">{user.username}</p>
                  </td>
                  <td>
                    <p className="w-[220px]">
                      {user.firstName} {user.lastName}
                    </p>
                  </td>
                  <td>
                    {selectedUserId === user.id ? (
                      <div className="flex items-center space-x-3">
                        <select
                          style={{
                            borderRadius: "0.25rem",
                            padding: "0.25rem",
                          }}
                          value={newRole}
                          onChange={handleSelectChange}
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                        <button className="btn btn-xs btn-accent"
                          onClick={handleConfirmRoleChange}
                          disabled={
                            selectedUserId === obtenerUsuarioActual()?.id
                          }
                        >
                          Confirmar
                        </button>
                        <a
                            className="font-light text-red-700 cursor-pointer hover:underline flex justify-center items-center"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <span className="material-symbols-outlined">
                              delete_forever
                            </span>{" "}
                            Borrar
                          </a>
                      </div>
                    ) : (
                      <div className="flex">
                        <button
                          className={`cursor-pointer ${
                            user.role === "USER"
                              ? "text-yellow-500 bg-black rounded"
                              : "text-black bg-yellow-500 rounded"
                          }`}
                          style={{
                            padding: "0.4rem 0.8rem",
                            backgroundColor:
                              user.id === obtenerUsuarioActual()
                                ? "gray"
                                : null,
                          }}
                          onClick={() => handleRoleChange(user.id, user.role)}
                          disabled={user.id === obtenerUsuarioActual()}
                        >
                          {user.role}
                        </button>
                        {obtenerUsuarioActual() &&
                          user.id !== obtenerUsuarioActual() && (
                            <a
                            className="font-light text-red-700 cursor-pointer hover:underline flex justify-center items-center"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <span className="material-symbols-outlined">
                              delete_forever
                            </span>{" "}
                            Borrar
                          </a>
                          )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            <span>¿Seguro qué deseas eliminar el usuario?</span>
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
            <span>Usuario eliminado con éxito</span>
          </div>
        )}
      </div>
    </>
  );
};
