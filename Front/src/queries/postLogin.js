export const getHomeProductsList = async () => {
    try {
        const url = import.meta.env.VITE_BACKEND_URL + "products"
        
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener datos desde la API');
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.error(error);
    }
  };

