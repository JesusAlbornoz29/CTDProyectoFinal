import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalProvider } from "./contexts/Global.jsx";
import CartProvider from "./contexts/ProductsList.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </GlobalProvider>
);
