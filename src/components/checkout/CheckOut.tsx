import CheckoutForm from "./CheckOutForm";
import OrderSummary from "./OrderSummary";
import "./CheckOut.scss";

function CheckoutPage() {
  return (
    <div className="checkout-page">
      <CheckoutForm />
      <OrderSummary />
    </div>
  );
}

export default CheckoutPage;
