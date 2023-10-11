import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.tsx";
import { ProductsProvider } from "./components/context/ProductsProvider.tsx";
import { CartProvider } from "./components/context/CartProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
);
