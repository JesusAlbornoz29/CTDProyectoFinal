import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { useGlobalContext } from "./contexts/Global";
import AdminRoutes from "./router/AdminRoutes";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { useEffect, useState } from "react";
import AdminMobileOverlay from "./components/AdminMobileOverlay";
import Politicas from "./pages/Politicas";
import { Reservation } from "./pages/Reservation";
import { ConfirmPage } from "./pages/ConfirmPage";
import Contact from "./pages/Contact";

function App() {
  const { isAdmin } = useGlobalContext();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Conversar con compañero si se puede poner como rutas privadas/publicas/admin esto */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route
            path="*"
            element={
            <PrivateRoutes element={<UserRoutes />} />}
          /> */}
          <Route
            path="/admin/*"
            element={
              isAdmin ? (
                isMobile ? (
                  <AdminMobileOverlay />
                ) : (
                  <AdminRoutes />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/reservation/:id" element={<Reservation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/politicas" element={<Politicas />} /> {/* Nueva ruta */}
          <Route path="/confirma-reserva" element={<ConfirmPage />} />{/* Nueva ruta */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
