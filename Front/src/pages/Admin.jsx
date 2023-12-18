import { Link } from "react-router-dom";

import Img from "../../public/img/admin-home.jpg";

const Admin = () => {
  return (
    <>
      <div className=" hidden lg:grid hero min-h-screen h-fit bg-base-200">
        <div className="hero-content flex-col-reverse  lg:flex-row-reverse ">
          <img src={Img} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-4xl font-bold">
              Gestiona el negocio de manera fácil
            </h1>
            <p className="py-6">¿Qué necesitás hacer?</p>
            <div className="flex flex-wrap gap-4 max-w-2xl">
              <Link to="agregar-producto">
                <button className="btn bg-primary w-72 text-neutral hover:text-gray-100">
                  Agregar Máquina
                  <span className="material-symbols-outlined">add</span>
                </button>
              </Link>
              <Link to="/admin/productos">
                <button className="btn btn-outline w-72">
                  Administrar Maquinaria
                  <span className="material-symbols-outlined">engineering</span>
                </button>
              </Link>
              <Link to="/admin/categorias">
                <button className="btn btn-outline w-72">
                  Gestionar Categorías
                  <span className="material-symbols-outlined">category</span>
                </button>
              </Link>
              {/*               <button className="btn btn-outline w-72 btn-disabled">
                Gestionar Características
                <span className="material-symbols-outlined">manufacturing</span>
              </button> */}
              <Link to="/admin/usuarios">
                <button className="btn btn-outline w-72">
                  Administrar Usuarios
                  <span className="material-symbols-outlined">
                    manage_accounts
                  </span>
                </button>
              </Link>
              <Link to="/admin/reservas">
                <button className="btn btn-outline w-72">
                  Administrar Reservas
                  <span className="material-symbols-outlined">
                    confirmation_number
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
