import { Link } from "react-router-dom";
export const AgregarMaquina = () => {
  return (
    <>
      <div className="flex  ">
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <Link
          className="btn bg-primary text-black"
          to="/admin/agregar-producto"
        >
          + Agregar Maquina
        </Link>
      </div>
    </>
  );
};
