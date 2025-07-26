import PlansCard from "../components/common/PlansCards";
import { Shield, Star, Gem } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "9.99",
    features: [
      "HD (720p) Quality",
      "Watch on 1 screen",
      "Limited movie library",
    ],
    icon: Shield,
    color: "gray",
    buttonText: "Select Basic",
  },
  {
    name: "Premium",
    price: "15.99",
    features: [
      "Full HD (1080p) Quality",
      "Watch on 2 screens at once",
      "Full movie library",
      "Download on 2 devices",
    ],
    icon: Star,
    color: "red",
    popular: true,
    buttonText: "Choose Premium",
  },
  {
    name: "Luxury",
    price: "21.99",
    features: [
      "Ultra HD (4K) & HDR",
      "Watch on 4 screens at once",
      "Full movie library",
      "Download on 6 devices",
      "Early access to new releases",
    ],
    icon: Gem,
    color: "yellow",
    buttonText: "Go Luxury",
  },
];
export default function PlansPage() {
  // get login status from localStorage
  const isLoggedIn = localStorage.getItem("loginStatus") === "true";
  console.log("CheckoutPage isLoggedIn:", isLoggedIn); 
  return (
    <>
      <section className="plans-page text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Choose Your Plan
          </h1>
          <p className="text-base sm:text-lg text-gray-400">
            Join{" "}
            <span className="font-extrabold bg-gradient-to-r from-blue-500 to-red-700 bg-clip-text text-transparent">
              POPCORN
            </span>{" "}
            and enjoy the latest movies and shows without limits.{" "}
            <br className="hidden sm:inline" />
            Change or cancel your plan anytime.
          </p>
        </div>
        <PlansCard plans={plans} />
      </section>
    </>
  );
}
