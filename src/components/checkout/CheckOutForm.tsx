import { useState } from "react";
import { notifySuccess, notifyError } from "../ui/ToastProvider";
import "./CheckOutForm.scss";

function CheckoutForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.paymentMethod
    ) {
      notifyError("Please fill in all fields");
      return false;
    }

    if (!formData.email.includes("@")) {
      notifyError("Invalid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Simulação de checkout
    notifySuccess("Order placed successfully!");
    console.log("Checkout data:", formData);

    // mais tarde:
    // limpar carrinho
    // redirect
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Checkout</h2>

      <input
        type="text"
        name="name"
        placeholder="Full name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={handleChange}
      />

      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
      >
        <option value="">Select payment method</option>
        <option value="card">Credit Card</option>
        <option value="mbway">MB Way</option>
        <option value="paypal">PayPal</option>
      </select>

      <button type="submit" className="btn-black">
        Place Order
      </button>
    </form>
  );
}

export default CheckoutForm;
