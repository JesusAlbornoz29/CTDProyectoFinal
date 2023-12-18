/* eslint-disable react/no-unknown-property */

import { useState } from "react";
import Categorie from "../components/Categorie";
import ProductsList from "../components/Home/ProductsList/ProductsList";
import ProductSearch from "../components/Home/Search/ProductSearch";
import CartProvider from "../contexts/ProductsList";
import Datepicker from "react-tailwindcss-datepicker";
import HomeImg from "../../public/img/bg-image-hero.jpg";

export const Home = () => {
  const [filter, setFilter] = useState({
    date: {
      startDate: null,
      endDate: null,
    },
    search: "",
    category: "",
  });
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [filterDate, setFilterDate] = useState(false);

  const handleValueChange = (newValue) => {
    setFilterDate(true);
    setValue(newValue);
    setFilter((prevFilter) => ({
      ...prevFilter,
      date: {
        startDate: newValue.startDate,
        endDate: newValue.endDate,
      },
      category: "",
    }));
  };

  // THANKS GPT!!

  // Create a new Date object for today's date
  const today = new Date();
  // Get the year, month, and day
  const year = today.getFullYear();
  // Months are zero-based (0 = January, 1 = February, etc.)
  // To get the current month, add 1
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  const handleFilterChange = (newFilter) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      search: newFilter,
    }));
  };

  const handleFilterCategory = (newFilter) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: newFilter,
    }));
  };
  return (
    <main className="flex flex-col scroll-smooth">
      <div
        id="hero-home"
        className="hero min-h-fit"
        style={{
          backgroundImage: 'url(https://i.imgur.com/TIMOCng.jpeg)',
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-primary-content mt-28 mb-20 sm:mb-40">
          <div className="max-w-2xl">
            <h1 className="mb-3 text-3xl sm:text-4xl font-extrabold text-white">
              Renta de Maquinaria Pesada
            </h1>
            <h3 className="mb-8 text-xl sm:text-2xl font-bold">
              La solución perfecta para tu proyecto
            </h3>

            {/* BUSCADOR DESKTOP */}

            <div className="hidden sm:join">
              <div className="rounded-l-full">
                <CartProvider>
                  <ProductSearch onFilterChange={handleFilterChange} />
                </CartProvider>
              </div>
              <div className="flex items-center bg-[#1E293B] sm:join-item rounded h-12">
                <Datepicker
                  minDate={formattedDate}
                  value={value}
                  startFrom={formattedDate}
                  onChange={handleValueChange}
                  i18n={"es"}
                  popoverDirection="down"
                  placeholder={"Cuáles fechas?"}
                  separator={" → "}
                  displayFormat={"DD/MM/YY"}
                  primaryColor={"yellow"}
                  startWeekOn="mon"
                  showFooter={true}
                  configs={{
                    footer: {
                      cancel: "Cancelar",
                      apply: "Aplicar",
                    },
                  }}
                />
              </div>
              <button className="btn sm:join-item sm:rounded-r-full text-primary">
                Buscar
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>

            {/* BUSCADOR MOBILE */}

            <div className=" flex flex-col sm:hidden gap-1">
              <div className=" rounded-xl overflow-clip">
                <CartProvider>
                  <ProductSearch onFilterChange={handleFilterChange} />
                </CartProvider>
              </div>
              <div className=" flex gap-1">
                <div className="flex items-center bg-[#1E293B] h-12 y w-4/5 rounded-xl">
                  <Datepicker
                    i18n={"es"}
                    placeholder={"En qué fechas?"}
                    separator={" → "}
                    displayFormat={"DD/MM/YY"}
                    primaryColor={"yellow"}
                    value={value}
                    onChange={handleValueChange}
                  />
                </div>
                <button className="btn text-primary w-1/5 rounded-xl">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
            </div>

            <p className="my-4">
              Usa la maquinaria que necesitas, cuando la necesitas y sin
              necesidad de comprarla
            </p>
          </div>
        </div>
      </div>
      <CartProvider>
        <ProductsList
          filter={filter}
          handleFilterCategory={handleFilterCategory}
          filterDate={filterDate}
        />
      </CartProvider>
      <div id="catSection" className=" flex flex-col items-center py-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-20">
          Explora nuestras opciones por categorías
        </h2>

        <div id="catNav" className="flex justify-center">
          <Categorie handleFilterCategory={handleFilterCategory} />
        </div>
      </div>
    </main>
  );
};
