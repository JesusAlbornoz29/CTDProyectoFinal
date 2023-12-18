import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/Global";

export default function PrivateRoute({ element, adminOnly }) {
  const { isLoggedIn, isAdmin } = useGlobalContext();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (isLoggedIn && isAdmin) {
    return element
  }
}