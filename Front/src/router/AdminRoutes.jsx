import { Route, Routes } from "react-router-dom";
import AddProducts from "../pages/AddProducts";
import Admin from "../pages/Admin";
import AdminMobileOverlay from "../components/AdminMobileOverlay";
import ListProduct from "../pages/ListProduct";
import ListCategories from "../pages/ListCategories"
import ListBookings from "../pages/ListBookings"
import ListUsers from "../pages/ListUsers"
export default function AdminRoutes() {
  /* SUPONGO QUE HAY QUE SACAR ESTE COMPONENTE  'Admin' DE AQUÍ...
Y Hacer que Reemplace por completo el Home de User y Cliente */

  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <>
            <AdminMobileOverlay />
            <Admin />
            {/*<div className='min-h-[80vh] flex justify-center pt-[80px]'>
       { <Link to='agregar-producto' className='btn btn-warning hover:bg-transparent hover:text-[#fff]'>Agregar Productos</Link>}
        </div> */}
          </>
        }
      />
      <Route path="agregar-producto" element={<AddProducts />}/>
      <Route path="productos" element={<ListProduct />}/>
      <Route path="categorias" element={<ListCategories/>}/> 
      <Route path="reservas" element={<ListBookings/>}/> 
      <Route path="usuarios" element={<ListUsers/>}/>
    </Routes>
  );
}
