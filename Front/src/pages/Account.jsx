/* eslint-disable react/no-unknown-property */
import BackBtn from "../components/BackBtn";

const Account = () => {
  return (
    <>
      <section className="w-full flex justify-center items-center flex-col bg-neutral h-[90vh]">
        <div className="px-16 h-full w-screen mt-40 m-5">
          <div className="flex justify-between w-full mb-5">
            <div className="flex flex-row gap-4 items-center">
              <h1 className="text-3xl font-bold">Mi Cuenta</h1>
              <div className=" bg-base-100 rounded-full w-9 h-9 flex items-center justify-center">
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </div>
            </div>
            <BackBtn />
          </div>

          <div className="my-6">
            <h4 className="">Nombre Completo:</h4>
            <h4 className="text-primary-content font-bold">{`${
              JSON.parse(localStorage.getItem("userDto")).firstName
            } ${JSON.parse(localStorage.getItem("userDto")).lastName}`}</h4>
          </div>
          <div className="my-6">
            <h4 className="">Email Registrado:</h4>
            <h4 className="text-primary-content font-bold">{`${
              JSON.parse(localStorage.getItem("userDto")).username
            }`}</h4>
          </div>
          <div className="my-8">
            <button className="btn btn-outline btn-error btn-sm">
              <span className="material-symbols-outlined">delete</span>
              Eliminar mi Cuenta
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Account;
