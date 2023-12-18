/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + data.length) % data.length);
  };

  return (
    <div className="relative">
      {/*       <button
        className="absolute inset-y-1/2 left-0 z-10 text-white px-3 py-1 rounded"
        onClick={prevSlide}
      >
        Anterior
      </button> */}
      <button
        className="btn btn-circle bg-base-100 text-white opacity-60 absolute inset-y-1/2 left-0 z-10"
        onClick={prevSlide}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        className="btn btn-circle bg-base-100 text-white opacity-60 absolute inset-y-1/2 right-0 z-10"
        onClick={nextSlide}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
      <div className="flex justify-center items-center">
        {data.map((image, index) => (
          <div
            key={index}
            className={`w-full h-64 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            <img
              src={`data:image/jpeg;base64, ${image.productImage}`}
              alt={`Imagen ${index}`}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
