/* eslint-disable no-unused-vars */

import LogoCode from "../components/LogoCode";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../contexts/Global";
import { Alerts } from "../utils/Alerts";
import { sendEmail } from "../utils/send-email";
import SignImg from "../../public/img/signup-bg.jpg";


const Signup = () => {
  //Captura de Datos del Form SIGN UP

  const [userData, setUserData] = useState({
    firstname: { value: "", isOK: null },
    lastname: { value: "", isOK: null },
    email: { value: "", isOK: null } /* username */,
    password: { value: "", isOK: null },
    terms: { value: false },
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

  // Manejadores:

  const handleNameData = (e) => {
    // Validar NOMBRE... > 3 letras
    const element = e.target;
    if (e.target.value.length >= 3 && e.target.value.charAt(0) !== " ") {
      element.classList.replace("input-error", "input-success");
      setUserData({
        ...userData,
        firstname: { value: e.target.value, isOK: true },
      });
    } else {
      element.classList.add("input-error");
      setUserData({
        ...userData,
        firstname: { value: "", isOK: false },
      });
    }
  };
  const handleLastNameData = (e) => {
    // Validar APELLIDO > 3 letras
    const element = e.target;
    if (e.target.value.length >= 3 && e.target.value.charAt(0) !== " ") {
      element.classList.replace("input-error", "input-success");
      setUserData({
        ...userData,
        lastname: { value: e.target.value, isOK: true },
      });
    } else {
      element.classList.add("input-error");
      setUserData({
        ...userData,
        lastname: { value: "", isOK: false },
      });
    }
  };
  const handleEmailData = (e) => {
    // Validar EMAIL con Regex común
    const element = e.target;
    const regex =
      /* /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; */
      /\S+@\S+\.\S+/;

    if (regex.test(e.target.value)) {
      element.classList.replace("input-error", "input-success");
      setUserData({
        ...userData,
        email: { value: e.target.value, isOK: true },
      });
    } else {
      element.classList.add("input-error");
      setUserData({
        ...userData,
        email: { value: "", isOK: false },
      });
    }
  };
  const handlePassData = (e) => {
    // Validar PASSWORD > 4 Caracteres
    const element = e.target;

    if (e.target.value.length >= 4 && e.target.value.charAt(0) !== " ") {
      element.classList.replace("input-error", "input-success");
      setUserData({
        ...userData,
        password: { value: e.target.value, isOK: true },
      });
    } else {
      element.classList.add("input-error");
      setUserData({
        ...userData,
        password: { value: "", isOK: false },
      });
    }
  };
  const handleTerms = (e) => {
    // Validar TERMINOS Y CONDICIONES...
    setUserData({
      ...userData,
      terms: { value: e.target.checked },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username: userData.email.value,
      password: userData.password.value,
      firstname: userData.firstname.value,
      lastname: userData.lastname.value,
    };

    fetch(import.meta.env.VITE_BACKEND_URL + "auth/register", {
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
        const templateID = "template_lztv7ki"
        sendEmail(body, templateID)
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
          text: "No pudimos crear el usuario",
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
          backgroundImage: 'url(https://i.imgur.com/573H8L3.jpg)',
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
          <div className="hero-content flex-col lg:flex-row-reverse gap-6 mt-[10vh] max-w-xs sm:max-w-max">
            <div className="text-center lg:text-left w-96">
              <h1 className="text-4xl font-bold text-primary-content mt-6 lg:mt-0">
                Registráte Ya!
              </h1>
              <p className="text-lg my-4 max-w-full font-medium sm:text-xl sm:font-medium lg:mb-10">
                Y Disfrutá de hacer <br />
                <span className="text-primary">
                  todo el trabajo pesado en un clic!
                </span>
              </p>
              <LogoCode />
            </div>
            <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-72 sm:w-full max-w-sm">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nombre</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresá tu Nombre"
                    className="input input-bordered placeholder:text-secondary-content"
                    onChange={handleNameData}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Apellido</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresá tu Apellido"
                    className="input input-bordered placeholder:text-secondary-content"
                    onChange={handleLastNameData}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Ingresá tu email"
                    className="input input-bordered placeholder:text-secondary-content"
                    onChange={handleEmailData}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Crea tu Contraseña</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Mínimo de 4 carácteres"
                    className="input input-bordered placeholder:text-secondary-content"
                    onChange={handlePassData}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer flex-row-reverse justify-end gap-2">
                    <span className="label-text">
                      Acepto lo que tengo que aceptar
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={handleTerms}
                    />
                  </label>
                </div>
                <p className="label-text my-4">
                  Ya tienes cuenta?
                  <Link to="/Login">
                    <a
                      href="#"
                      className="text-sm label-text-alt link font-bold text-accent link-hover"
                    >
                      {" "}
                      Loguéate aquí{" "}
                    </a>
                  </Link>
                </p>
                <div className="form-control mt-6">
                  <button className="btn bg-primary text-base-100 hover:bg-yellow-500">
                    CREAR CUENTA
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
