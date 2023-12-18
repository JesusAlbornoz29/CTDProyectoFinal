export const ConfirmPage = () => {
  const user = JSON.parse(localStorage.getItem("userDto"));

  return (
    <div className="h-screen">
      <main className="flex flex-col justify-center items-center w-full h-full bg-neutral gap-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-accent shrink-0 h-16 w-16"
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
        <p className=" font-bold text-xl">
          Felicitaciones {user.firstName} {user.lastName}! <br /> Tu reserva ha
          sido confirmada.
        </p>
        <p>
          Te hemos enviado un correo a: <br />{user.username} <br />con los detalles de tu
          reserva.
        </p>
      </main>
    </div>
  );
};
