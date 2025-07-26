import { CreditCard, Calendar } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Toast from "./Toast.jsx";
export default function Checkout({ plans, planName }) {
  //form states
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleExpiryInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    e.target.value = value;
  };

  const handleCardNumberInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    value = value.slice(0, 16); // Limit to 16 digits
    const parts = value.match(/.{1,4}/g);
    e.target.value = parts ? parts.join(" ") : "";
  };

  const handleCardHolderInput = (e) => {
    let value = e.target.value;
    value = value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-letter characters
    e.target.value = value;
  };

  const handleCVVInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    value = value.slice(0, 4); // Limit to 4 digits max
    e.target.value = value;
  };

  // State for toast notification
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  // Find the selected plan based on the planName from URL params
  const selectedPlan = plans.find(
    (plan) => plan.name.toLowerCase() === planName?.toLowerCase()
  );

  const handleToastClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleCompletePurchase = () => {
    if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
      setMessage("Please fill in all fields.");
      setSeverity("error");
      setOpen(true);
      return;
    }
    // Simulate a successful purchase
    setMessage(`Purchase successful for ${selectedPlan.name} plan!`);
    setSeverity("success");
    setOpen(true);
    // Reset form fields
    setCardholderName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto px-4">
      {/* Payment Details Section */}
      <div className="flex-1 bg-gray-900/50 p-8 rounded-2xl">
        <h1 className="text-2xl font-bold mb-4 text-white">Payment Details</h1>
        <div className="flex items-center space-x-4 mb-6">
          <h2 className="text-lg text-gray-400">Credit Card</h2>
          <CreditCard style={{ width: "30px", height: "30px" }} />
        </div>

        <form id="payment-form" className="space-y-5">
          <div>
            <label
              htmlFor="cardholder-name"
              className="block text-sm font-medium mb-1 text-gray-300"
            >
              Cardholder Name
            </label>
            <input
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              type="text"
              name="cardHolder"
              id="cardHolder"
              placeholder="Card Holder Name"
              maxLength={30}
              onInput={handleCardHolderInput}
              required
              className="p-2 rounded bg-gray-700 text-white w-full"
            />
          </div>

          <div>
            <label
              htmlFor="card-number"
              className="block text-sm font-medium mb-1 text-gray-300"
            >
              Card Number
            </label>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              onInput={handleCardNumberInput}
              required
              className="p-2 rounded bg-gray-700 text-white w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expiry-date"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                Expiry Date
              </label>
              <input
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                type="text"
                name="expiryDate"
                id="expiryDate"
                placeholder="MM/YY"
                maxLength={5}
                onInput={handleExpiryInput}
                required
                className="p-2 rounded bg-gray-700 text-white w-full"
              />
            </div>

            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                CVV
              </label>
              <input
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                type="text"
                name="cvv"
                id="cvv"
                placeholder="CVV"
                maxLength={4}
                onInput={handleCVVInput}
                required
                className="p-2 rounded bg-gray-700 text-white w-full"
                pattern="\d{3,4}"
                title="Enter a 3 or 4 digit CVV"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Order Summary Section */}
      <div className="w-full lg:w-[30%] bg-gray-900/50 p-8 rounded-xl h-fit">
        <h1 className="text-2xl font-bold mb-4 text-white">Order Summary</h1>
        <div className="flex items-center space-x-4 mb-6">
          <Calendar style={{ width: "30px", height: "30px" }} />
          <h2 className="text-lg text-white">
            {new Date().toLocaleDateString()}
          </h2>
        </div>
        <div className="space-y-4 text-gray-400">
          <div className="flex justify-between">
            <span>Plan</span>
            <span>{selectedPlan?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Price</span>
            <span>${selectedPlan?.price}/month</span>
          </div>
          <div className="flex justify-between">
            <span>Next Billing Date</span>
            <span>
              {new Date(
                new Date().setMonth(new Date().getMonth() + 1)
              ).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-white font-bold">
            <span className="text-2xl">Total</span>
            <span className="text-2xl">${selectedPlan?.price}</span>
          </div>
        </div>
        <button
          onClick={handleCompletePurchase}
          className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg mt-6"
        >
          Complete Purchase
        </button>
      </div>

      {/* Toast Notification */}
      <Toast
        open={open}
        message={message}
        severity={severity}
        onClose={handleToastClose}
      />
    </div>
  );
}
