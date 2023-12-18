import { useRef, useState, useEffect } from "react";
import { ContextProducts } from "../../../contexts/ProductsList";
import { useContext } from "react";

function ProductSearch({ onFilterChange }) {
  const { products } = useContext(ContextProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
  });

  const searchRef = useRef(null);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setShowSuggestions(true);

    // Filtrar productos que coincidan con el término de búsqueda
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(results);
    onFilterChange(term);
  };

  const handleSuggestionClick = (productName) => {
    setSearchTerm(productName);

    onFilterChange(productName);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  // const applyFilters = () => {
  //   let results = [...products];

  //   if (filters.category) {
  //     results = results.filter(
  //       (product) => product.category === filters.category
  //     );
  //   }

  //   setSearchResults(results);
  // };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="">
      <div className="join-item sm:rounded-r-full bg-[#1E293B]">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
          className="input rounded sm:rounded-l-full w-full bg-[#1E293B] sm:w-auto placeholder:text-sm placeholder:font-light placeholder:tracking-wide"
        />
      </div>
      {showSuggestions && (
        <ul className="absolute z-10 bg-white border border-gray-300 mt-1 max-w-3xl min-w-fit max-h-40 overflow-y-auto rounded-md shadow-lg">
          {searchResults.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSuggestionClick(product.name)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductSearch;
