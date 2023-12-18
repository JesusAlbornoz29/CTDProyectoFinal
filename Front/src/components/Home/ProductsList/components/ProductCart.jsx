import { Link } from "react-router-dom";

export default function ProductCart({ name, description, productImages, id }) {
  return (
    <Link to={"/details/" + id}>
      <article className="max-w-[600px] min-h-[400px] lg:min-h-[300px] max-h-[300px] h-full rounded-[16px] flex flex-wrap sm:flex-nowrap md:flex-wrap lg:flex-nowrap overflow-hidden bg-[#1D232A]">
        <img
          className="h-[60%] sm:h-[unset] w-full sm:w-1/2 md:w-full md:h-[55%] lg:h-[unset] lg:w-[55%] object-cover"
          src={"data:image/png;base64," + productImages?.[0]?.productImage}
          alt={productImages?.alt}
        />
        <div className="p-[24px] w-full flex flex-col justify-between items-end gap-[8px] overflow-hidden">
          <div className="w-full flex flex-col gap-[24px]">
            <h3 className="text-[20px] font-[600] text-ellipsis overflow-hidden">
              {name}
            </h3>
            <p className="truncate ... text-ellipsis overflow-hidden">{description}</p>
          </div>
          <div className="bg-[#FFE100] flex items-center text-[#1D232A] px-[12px] rounded-[8px] h-[32px] font-400">
            Ver Detalle
          </div>
        </div>
      </article>
    </Link>
  );
}
