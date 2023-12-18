import { Link } from "react-router-dom";

export const ReservationPolitics = () => {
  return (
    <div className="w-full mt-16 lg:mt-4 px-8 flex flex-col-reverse justify-center items-center mb-32">
      <div className="w-full md:w-2/3 h-fit">
        <h3 className="text-primary text-lg font-medium my-4">
          Obligaciones de Arrendatario:
        </h3>
        <ul className=" text-xs list-disc">
          <li className=" mb-2">
            El Arrendatario deberá utilizar la Máquina con la diligencia y
            cuidado debidos conforme al uso a que está destinada y de acuerdo
            con las especificaciones técnicas del fabricante, debiendo asimismo
            informar a Maquinaria PRO de las condiciones de utilización.
          </li>
          <li className=" mb-2">
            Cualquier utilización de la Máquina diferente deberá ser previamente
            informada a Maquinaria PRO y será consignada en el Contrato.
          </li>
          <li className=" mb-2">
            El Arrendatario será responsable de cualquier utilización de la
            Máquina no conforme a la declaración previa que haya realizado o a
            su destino normal.
          </li>
          <li className=" mb-2">
            El Arrendatario es responsable de cuantos hechos se deriven de la
            utilización de la Máquina que no sean imputables al incumplimiento
            por Maquinaria PRO de sus obligaciones.
          </li>
          <li className=" mb-2">
            El Arrendatario deberá informar a Maquinaria PRO inmediatamente
            sobre cualquier incidencia, avería o eventualidad que afecte a la
            Máquina.
          </li>
          <li className=" mb-2">
            El Arrendatario tiene el deber de guarda y custodia de la Máquina,
            siendo el poseedor responsable de los daños y perjuicios ocasionados
            por y a ésta.
          </li>
          <li className=" mb-2">
            El Arrendatario es responsable de todos los daños que se causen a la
            Máquina.
          </li>
          <li className=" mb-2">
            El Arrendatario es responsable de la revisión diaria y de la
            conservación de la Máquina en los términos que se indican en la
            cláusula 11.
          </li>
          <li className=" mb-2">
            El Arrendatario es responsable de las averías ocasionadas a la
            Máquina en los términos previstos en la cláusula 11.
          </li>
          <li className=" mb-2">
            El Arrendatario es responsable del montaje, instalación y desmontaje
            que precise la Máquina en los términos previstos en la cláusula 12.
          </li>
          <li className=" mb-2">
            Salvo que sea un servicio contratado expresamente a Maquinaria PRO
            conforme la cláusula 10, el Arrendatario es responsable del
            transporte de la Máquina desde las dependencias de Maquinaria PRO y,
            a su devolución, desde el lugar en el que se encuentre la Máquina.
          </li>
          <p>
            Para conocer toda la información al detalle, ve a la sección{" "}
            <Link
              className="underline hover:text-accent"
              to="/politicas"
              target="blank"
            >
              {" "}
              Política generales de contratacion{" "}
            </Link>{" "}
          </p>
        </ul>
      </div>
    </div>
  );
};
