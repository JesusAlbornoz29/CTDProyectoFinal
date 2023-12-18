import { useEffect, useState } from "react";

const useApi = (url, options = {}) => {
  // Inicializar options como un objeto vacío si no se proporciona
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (body) => {
    if (!url) return;
    try {
      const response = await fetch(url, {
        ...options, // Mantener las opciones originales
        body: JSON.stringify(body), // Agregar el cuerpo (body) a la solicitud
      });

      if (!response.ok) throw new Error("Error en la petición fetch");

      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, fetchData };
};

export default useApi;
