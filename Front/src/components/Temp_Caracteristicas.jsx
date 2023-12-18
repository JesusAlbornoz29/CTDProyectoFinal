/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */

const Temp_Caracteristicas = () => {
  const caracteristicas_array = [
    {
      title: "Potencia: 45 HP",
      icon: "swap_driving_apps_wheel",
    },
    {
      title: "Motor: Diesel",
      icon: "oil_barrel",
    },
    {
      title: "Pala: Acopable",
      icon: "precision_manufacturing",
    },
    {
      title: "Tracción: 4x4",
      icon: "search_hands_free",
    },
    {
      title: "Marchas: 8 de avance y 2 de retroceso",
      icon: "auto_transmission",
    },
    {
      title: "Suspensión de 3 puntos",
      icon: "agriculture",
    },
    {
      title: "GPS",
      icon: "location_on",
    },
  ];

  const caracteristicas = caracteristicas_array.map((caracteristica, index) => {
    return (
      <div
        className=" flex justify-start items-center gap-2 border-[1.5px] rounded-md m-2 px-2 py-1 max-w-fit border-secondary-content"
        key={index}
      >
        <span className="material-symbols-outlined">{caracteristica.icon}</span>
        <p>{caracteristica.title}</p>
      </div>
    );
  });

  return (
    <div className=" h-screen">
      <div>{caracteristicas}</div>
    </div>
  );
};
export default Temp_Caracteristicas;
