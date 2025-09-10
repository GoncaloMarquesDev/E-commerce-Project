import AllCategories from "../allcategories/AllCategories";
import Footer from "../footer/Footer";
import ProductsWrapper from "../productswrapper/ProductsWrapper";




function LandingPage() {
  return (
    <div className="landing-wrapper">
      {" "}
      <ProductsWrapper/>
      <AllCategories/>
      <Footer/>
      
      
    </div>
  );
}

export default LandingPage;
