import { createContext, useEffect, useState } from "react";
import {
  getHomeProductsList,
  getProductTypes,
} from "../queries/getHomeProductsList";
import { randomizerProducts } from "../utils/randomizerProducts";

export const ContextProducts = createContext({
  products: [],
  setProducts: () => {},
  pagination: { page: 1, totalProducts: 10, itemsPerPage: 6, totalPages: 0 },
  handlerPageChange: () => {},
  productsViewed: undefined,
  setProductsViewed: () => {},
});

export default function CartProvider(props) {
  const [products, setProducts] = useState([]);
  const [productsViewed, setProductsViewed] = useState(undefined);
  const [pagination, setPagination] = useState({
    page: 1,
    totalProducts: 10,
    itemsPerPage: 6,
    totalPages: 0,
  });
  const [productTypes, setProductTypes] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const handlerPageChange = (page) => {
    setPagination({
      ...pagination,
      page,
    });
    setProductsViewed(
      products.slice(
        (page - 1) * pagination.itemsPerPage,
        page * pagination.itemsPerPage
      )
    );
  };

  useEffect(() => {
    getHomeProductsList().then((products) => {
      const randomProds = randomizerProducts(products);
      setAllProducts(randomProds);
      setProducts(randomProds);
      const firstChunk = randomProds?.slice(0, 6);
      setProductsViewed(firstChunk);
      setPagination({
        ...pagination,
        totalPages: Math.ceil(randomProds?.length / pagination.itemsPerPage),
      });
    });
    getProductTypes().then((types) => {
      setProductTypes(types);
    });
  }, []);

  return (
    <ContextProducts.Provider
      value={{
        products,
        setProducts,
        productsViewed,
        setProductsViewed,
        pagination,
        handlerPageChange,
        productTypes,
        setPagination,
        allProducts,
      }}
    >
      {props.children}
    </ContextProducts.Provider>
  );
}
