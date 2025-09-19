import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/main.scss";

import Nav from "./components/nav/Nav";
import LandingPage from "./components/landingpage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router";
import DetailProduct from "./components/detailproduct/DetailProduct";
import Categories from "./components/categories/Categories";
import { CartProvider } from "./context/CartContext";
import ShopCart from "./components/shopcart/ShopCart";
import NotFound from "./components/notfound/NotFound";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/cart" element={<ShopCart />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/detail/:id" element={<DetailProduct />} />
          <Route path="/category/:id" element={<Categories />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
