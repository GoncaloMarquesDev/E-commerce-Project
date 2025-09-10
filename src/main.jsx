import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/reset.scss";
import "./styles/global.scss";

import Nav from "./components/nav/Nav";
import LandingPage from "./components/landingpage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router";
import DetailProduct from "./components/detailproduct/DetailProduct";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detail/:id" element={<DetailProduct />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
