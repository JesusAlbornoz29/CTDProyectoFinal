/* eslint-disable react/no-unknown-property */
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      className="btn btn-ghost hidden md:flex items-center px-4"
      onClick={goBack}
    >
      <span className="material-symbols-outlined">arrow_back</span>
      <span className=" normal-case font-normal">Atrás</span>
    </button>
  );
};
export default BackBtn;
