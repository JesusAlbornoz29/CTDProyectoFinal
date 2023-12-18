/* eslint-disable no-unused-vars */

import LogoCode from "../components/LogoCode";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../contexts/Global";
import { Alerts } from "../utils/Alerts";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: { value: "" },
    password: { value: "" },
  });
  const navigate = useNavigate();

  const { isLoggedIn, isAdmin, login, logout } = useGlobalContext();

  const [Alert, setAlert] = useState({
    color: "",
    text: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: loginData.email.value,
      password: loginData.password.value,
    };

    /* REVISAR AQUÍ LA REDIRECCION DESPUES DEL LOGIN */

    fetch(import.meta.env.VITE_BACKEND_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
          throw new Error("Error en la solicitud");
        }
      })
      .then((data) => {
        const { token, userDto } = data;

        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userDto", JSON.stringify(userDto));
        login(userDto);
        if (userDto.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        setAlert({
          color: "bg-error",
          text: "Verifica que tus datos de sean correctos.",
        });
        // **Update showAlert state to true**
        setShowAlert(true);
        return;
      });
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(https://i.imgur.com/nFHIlyT.jpg)',
        }}
      >
        <div className="hero min-h-screen bg-base-100 bg-opacity-80">
          {showAlert && (
            <Alerts
              text={Alert.text}
              bgColorClass={Alert.color}
              duration={2000}
              onDismiss={handleDismissAlert}
            />
          )}
          <div className="flex flex-col gap-6 max-w-xs sm:max-w-max ">
            <LogoCode />
            <div className="hero-content flex-col lg:flex-row-reverse gap-6">
              <div className="text-center lg:text-left w-96">
                <h1 className="text-4xl font-bold text-primary-content mt-6 lg:mt-0">
                  Entrá Ahora!
                </h1>
                <p className="text-lg py-2 max-w-full font-medium sm:text-xl sm:font-medium lg:py-4">
                  Y hacé todo tu <br />
                  <span className="text-primary">
                    trabajo pesado en un clic!
                  </span>
                </p>
              </div>
              <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-72 sm:w-full max-w-sm">
                <form className="card-body" onSubmit={handleSubmit}>
                <p className="label-text my-1 text-xs">
                    *Para poder hacer una reserva es necesario iniciar
                    sesión.</p>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Ingresá tu email"
                      className="input input-bordered placeholder:text-secondary-content"
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: { value: e.target.value, isOK: null },
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Contraseña</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Ingresá tu contraseña"
                      className="input input-bordered placeholder:text-secondary-content"
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: { value: e.target.value, isOK: null },
                        })
                      }
                      required
                    />
                  </div>
                  <p className="label-text my-4 text-sm">
                    Si aún no tienes una cuenta <br /> 
                    <Link to="/Signup">
                      <a
                        href="#"
                        className="text-sm label-text-alt link font-bold text-accent link-hover"
                      >
                        {" "}
                        Regístrate aquí{" "}
                      </a>
                    </Link>
                  </p>
                  <div className="tooltip text-left" data-tip="Lo sentimos, este es un MVP y aún no recuperamos contraseñas">
                    {" "}
                    <a
                      href="#"
                      className="text-sm label-text-alt link link-hover"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  </div>

                  <div className="form-control mt-6">
                    <button className="btn bg-primary text-base-100 hover:bg-yellow-500">
                      INICIAR SESIÓN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
