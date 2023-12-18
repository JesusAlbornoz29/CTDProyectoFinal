import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../contexts/Global";

export const Header = () => {
  const { isAdmin, isLoggedIn, logout } = useGlobalContext();
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const navigate = useNavigate();
  let userDto = JSON.parse(localStorage.getItem("userDto"));
  const closeSessionHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userDto");
    logout();
    navigate("/");
  };
  return (
    <header className="navbar bg-base-100 fixed z-50 p-0">
      <div className=" navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <svg
            className="h-full"
            xmlns="http://www.w3.org/2000/svg"
            width="65"
            height="64"
            viewBox="0 0 65 64"
            fill="none"
          >
            <path
              d="M53.0616 52.8C54.7896 52.8 56.2616 54.272 56.2616 56C56.2616 57.728 54.7896 59.2 53.0616 59.2H14.6616C12.9336 59.2 11.4616 57.728 11.4616 56C11.4616 54.272 12.9336 52.8 14.6616 52.8H53.0616ZM53.0616 48H14.6616C10.2776 48 6.66164 51.616 6.66164 56C6.66164 60.384 10.2776 64 14.6616 64H53.0616C55.1834 64 57.2182 63.1571 58.7185 61.6569C60.2188 60.1566 61.0616 58.1217 61.0616 56C61.0616 53.8783 60.2188 51.8434 58.7185 50.3431C57.2182 48.8429 55.1834 48 53.0616 48ZM61.0616 28.8H51.4616V16H35.4616L25.8616 28.8V44.8H64.2616L61.0616 28.8ZM30.7896 28.8L37.0616 20.8H45.0616V28.8H30.7896ZM25.0936 4.512L9.09364 0L0.261637 31.456C-0.826363 35.552 1.57364 39.808 5.70164 40.96L9.41364 41.984L19.9416 32.928L7.52564 29.472L13.5416 7.872L22.4696 10.368C24.2616 11.296 28.1336 13.888 30.5656 17.184L33.8616 12.8H35.2696C31.2376 7.712 25.3816 4.672 25.0936 4.512Z"
              fill="#FFE100"
            />
          </svg>
          <div className="flex flex-col">
            <h1>Maquinaria Pro</h1>
            <p className="text-xs">Trabajo pesado a un clic</p>
          </div>
        </Link>
      </div>

      {isLoggedIn ? (
        /* ADMINISTRADOR */
        isAdmin ? (
          <>
            <div className="navbar-center hidden lg:flex justify-center">
              <ul className="gap-2 menu menu-horizontal">
                <li>
                  <Link to="admin" className="font-medium tracking-wide">
                    Administrar Negocio
                  </Link>
                </li>
                <li>
                  <Link
                    to="admin/agregar-producto"
                    className="font-medium tracking-wide"
                  >
                    Agregar Máquina
                  </Link>
                </li>
              </ul>
            </div>
            <div className=" navbar-end flex items-center justify-end gap-2 mr-6">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className=" flex items-center gap-2 cursor-pointer"
                >
                  <p className=" w-32 text-right text-[14px]">
                    Hola!,{" "}
                    <span>{`${userDto ? userDto.firstName : "usuario"}`}</span>
                  </p>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-900 border border-primary">
                    <span className=" text-xl font-medium m-auto">
                      {`${userDto ? userDto.firstName.charAt(0) : "U"}`}
                      {/* {`${JSON.parse(localStorage.getItem("userDto")).firstName.charAt(0)}`} */}
                    </span>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/account">Mi Cuenta</Link>
                  </li>
                  <li>
                    <a onClick={closeSessionHandler}>Cerrar Sesión</a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          /* USUARIO */
          <>
            <div className="navbar-center hidden lg:flex justify-center">
              <ul className="gap-2 menu menu-horizontal">
                <li>
                  <Link to="/">
                    <a className="text-lg font-medium tracking-wide">Inicio</a>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <a className="text-lg font-medium tracking-wide">
                      Contacto
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className=" navbar-end hidden lg:flex items-center justify-cend gap-2 mr-6">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className=" flex items-center gap-2 cursor-pointer"
                >
                  <p className=" w-32 text-right text-[14px]">
                    Hola!,{" "}
                    <span>{`${userDto ? userDto.firstName : "usuario"}`}</span>
                  </p>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-900">
                    <span className=" text-xl font-medium m-auto">
                      {`${JSON.parse(
                        localStorage.getItem("userDto")
                      ).firstName.charAt(0)}`}
                    </span>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/account">Mi Cuenta</Link>
                  </li>
                  <li>
                    <a onClick={closeSessionHandler}>Cerrar Sesión</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full justify-end flex lg:hidden">
              <div className="dropdown dropdown-end" onClick={toggleMenu}>
                <label tabIndex={0} className="btn m-1">
                  <svg
                    className="fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                  </svg>
                </label>

                {showMenu && (
                  <ul
                    tabIndex={0}
                    className="gap-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/">Inicio</Link>
                    </li>
                    <li>
                      <a>Contacto</a>
                    </li>
                    <hr className=" border-neutral-900" />
                    <li>
                      <Link to="/account">Mi Cuenta</Link>
                    </li>
                    <li>
                      <a onClick={closeSessionHandler}>Cerrar Sesión</a>
                    </li>
                    <div className=" flex items-center justify-start gap-2 mb-2 pl-4">
                      <p className=" text-[14px]">
                        Hola!,{" "}
                        <span>{`${
                          JSON.parse(localStorage.getItem("userDto")).firstName
                        }`}</span>
                      </p>
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-900">
                        <span className=" text-xl font-medium m-auto">
                          {`${userDto ? userDto.firstName.charAt(0) : "U"}`}
                        </span>
                      </div>
                    </div>
                  </ul>
                )}
              </div>
            </div>
          </>
        )
      ) : (
        /* ANONIMO NO LOGUEADO */
        <>
          <div className="navbar-center hidden lg:flex justify-center">
            <ul className="gap-2 menu menu-horizontal">
              <li>
                <Link to="/">
                  <a className="text-lg font-medium tracking-wide">Inicio</a>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <a className="text-lg font-medium tracking-wide">Contacto</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex gap-2 navbar-end mr-4">
            <Link to="/Login">
              <a className="btn">Iniciar Sesion</a>
            </Link>
            <Link to="/Signup">
              <a className="mr-6 tracking-wide text-sm">Crear Cuenta</a>
            </Link>
          </div>

          <div className="w-full justify-end flex lg:hidden">
            <div className="dropdown dropdown-end" onClick={toggleMenu}>
              <label tabIndex={0} className="btn m-1">
                <svg
                  className="fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              </label>

              {showMenu && (
                <ul
                  tabIndex={0}
                  className="gap-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/">Inicio</Link>
                  </li>
                  <li>
                    <a>Contacto</a>
                  </li>
                  <li>
                    <a className="hover:bg-primary hover:text-black">
                      Renta de Maquinaria
                    </a>
                  </li>
                  <hr className=" border-neutral-900" />
                  <Link to="/Signup">
                    <a className="btn">Crear Cuenta</a>
                  </Link>
                  <Link to="/Login">
                    <a className="btn">Iniciar Sesion</a>
                  </Link>
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};
