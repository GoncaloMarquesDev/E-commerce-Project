import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/reset.scss";
import "./styles/global.scss";

import Nav from "./components/nav/Nav";
import LandingPage from "./components/landingpage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router";
import DetailProduct from "./components/detailproduct/DetailProduct";
import Clothes from "./components/clothes/Clothes";
import { CartProvider } from "./context/CartContext";
import ShopCart from "./components/shopcart/ShopCart";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/cart" element={<ShopCart />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/detail/:id" element={<DetailProduct />} />
          <Route path="/category/:id" element={<Clothes />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
