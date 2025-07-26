import { ChevronLeft } from "lucide-react";
import Checkout from "../components/common/Checkout";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
const plans = [
  {
    name: "Basic",
    price: "9.99",
  },
  {
    name: "Premium",
    price: "15.99",
  },
  {
    name: "Luxury",
    price: "21.99",
  },
];
export default function CheckoutPage() {
  const { planName } = useParams();

  // get login status from localStorage
  const isLoggedIn = localStorage.getItem("loginStatus") === "true";
  console.log("CheckoutPage isLoggedIn:", isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div
        className="text-white flex flex-col items-center justify-center text-center px-4"
        style={{ width: "100%", height: "calc(100vh - 200px)" }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          You are not logged in
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-md">
          Please log in or sign up to access the checkout page and complete your
          purchase.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
  return (
    <main className="w-full text-white px-4 py-10 min-h-[calc(100vh-200px)]">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="relative h-16">
          {/* Back Button - aligned left */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-red-500 transition-colors text-sm sm:text-base">
            <ChevronLeft className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-medium">Back to Plans</span>
          </button>

          {/* Title - centered */}
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl md:text-3xl font-extrabold text-white text-center">
            Complete Your Purchase
          </h1>
        </div>
      </div>

      {/* Checkout Component */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <Checkout plans={plans} planName={planName} />
      </div>
    </main>
  );
}
