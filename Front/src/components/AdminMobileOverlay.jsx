export default function AdminMobileOverlay() {
  return (
    <div className="lg:hidden flex flex-col items-center justify-center z-50 w-screen h-screen bg-neutral-900 gap-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="85"
        height="110"
        viewBox="0 0 85 110"
        fill="none"
      >
        <path
          d="M52 75L45 68L58 55L45 42L52 35L65 48L78 35L85 42L72 55L85 68L78 75L65 62L52 75ZM10 110C7.25 110 4.89583 109.021 2.9375 107.062C0.979167 105.104 0 102.75 0 100V10C0 7.25 0.979167 4.89583 2.9375 2.9375C4.89583 0.979167 7.25 0 10 0H60C62.75 0 65.1042 0.979167 67.0625 2.9375C69.0208 4.89583 70 7.25 70 10V30H60V25H10V85H60V80H70V100C70 102.75 69.0208 105.104 67.0625 107.062C65.1042 109.021 62.75 110 60 110H10ZM10 95V100H60V95H10ZM10 15H60V10H10V15Z"
          fill="#40454B"
        />
      </svg>
      <p className=" text-center">
        La Vista de Administrador <br />
        en Dispositivos Móviles <br /> no está disponible
      </p>
    </div>
  );
}
