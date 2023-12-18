import { useContext } from "react";
import { ContextProducts } from "../../../../contexts/ProductsList";

export default function Paginator() {
  const {
    pagination: { page, totalPages },
    handlerPageChange,
  } = useContext(ContextProducts);

  const arrayOriginal = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="join border-[1px] border-[#40454B] mb-[100px]">
      {arrayOriginal.map((item, index) => (
        <button
          key={index}
          onClick={() => handlerPageChange(index + 1)}
          className={`${
            page === index + 1 ? "btn-active bg-[#1D232A]" : "bg-[#2B323C]"
          } border-none join-item btn`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
