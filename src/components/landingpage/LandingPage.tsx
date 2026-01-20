import AllCategories from "../allcategories/AllCategories";
import Footer from "../footer/Footer";
/* import ProductsWrapper from "../productswrapper/ProductsWrapper"; */
import "./LandingPage.scss";
import { useEffect } from "react";

function LandingPage() {
  //lembrar de retirar o o remove intens do local storage
  useEffect(() => {
    localStorage.removeItem("cart_state");
  }, []);
  return (
    <div className="landing-wrapper">
      {" "}
      <AllCategories />
      <Footer />
    </div>
  );
}

export default LandingPage;
