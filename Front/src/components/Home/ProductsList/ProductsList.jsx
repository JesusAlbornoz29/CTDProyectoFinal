import { useContext, useEffect } from "react";
import { ContextProducts } from "../../../contexts/ProductsList";
import Paginator from "./components/Paginator";
import ProductCart from "./components/ProductCart";
import { Spinner } from "../../../utils/Spinner";
import { Filter } from "../Search/Filter";

export default function ProductsList({
  filter,
  handleFilterCategory,
  filterDate,
}) {
  const {
    productsViewed,
    products,
    productTypes,
    setProducts,
    allProducts,
    setProductsViewed,
  } = useContext(ContextProducts);

  useEffect(() => {
    let resultFilter = allProducts;

    if (allProducts.length > 0) {
      if (filterDate) {
        // Filtrar productos basados en la fecha seleccionada
        resultFilter = allProducts.filter((product) => {
          // Asumiendo que 'product.reservation' es un array de objetos con 'startDate' y 'endDate'
          return !product.reservations.some((reservation) => {
            const reservationStartDate = new Date(reservation.startDate);
            reservationStartDate.setHours(0, 0, 0, 0);
            const reservationEndDate = new Date(reservation.endDate);
            reservationEndDate.setHours(23, 59, 59, 999);
            const selectedStartDate = new Date(filter.date.startDate);
            selectedStartDate.setHours(0, 0, 0, 0);
            const selectedEndDate = new Date(filter.date.endDate);
            selectedEndDate.setHours(23, 59, 59, 999);

            return (
              reservationStartDate <= selectedEndDate &&
              reservationEndDate >= selectedStartDate
            );
          });
        });
      }

      resultFilter = resultFilter.filter(
        (product) =>
          product.name.toLowerCase().includes(filter.search.toLowerCase()) &&
          product.productType.description
            .toLowerCase()
            .includes(filter.category.toLowerCase())
      );

      setProducts(resultFilter);
      setProductsViewed(resultFilter.slice(0, 6));
    }
  }, [filter, filterDate, allProducts]);

  let title =
    filter.search === "" && filter.category === ""
      ? "Máquinas Disponibles en este momento"
      : `Resultados de la búsqueda (${products.length})`;

  return (
    <article
      id="ProductList"
      className="flex flex-col items-center gap-16 bg-[#2B323C] pt-16 lg:pt-24"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-around gap-6 w-80 lg:w-2/3">
        <h1 className=" text-xl md:text-2xl font-bold text-center lg:text-left">
          {title}
        </h1>
        <div className=" lg:w-1/2 flex items-center justify-center md:justify-start gap-2 px-2">
          Filtrar por:
          <Filter
            productTypes={productTypes}
            handleFilterCategory={handleFilterCategory}
          />
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-[28px] gap-y-[32px] ">
        {productsViewed === undefined ? (
          <Spinner />
        ) : productsViewed.length === 0 ? (
          <div className="col-span-2">No tenemos productos en stock</div>
        ) : (
          productsViewed.map((product) => (
            <ProductCart key={product.id} {...product} />
          ))
        )}
      </section>
      <Paginator />
    </article>
  );
}
