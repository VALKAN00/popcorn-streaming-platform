import { Heart } from "lucide-react";
import { useContext } from "react";
import { FavoriteMoviesContext } from "../components/context/MoviesContext.jsx";
import CardSection from "../components/common/CardSection.jsx";

import { Link } from "react-router-dom";
export default function FavoritesPage() {
  const { favoriteMovies } = useContext(FavoriteMoviesContext);

  //check login status
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
    <div className="Myfavorites-page flex flex-col min-h-screen w-full text-white px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-start space-x-4">
        <Heart className="text-pink-500" size={50} />
        <h1 className="text-4xl md:text-5xl font-bold">Favorites</h1>
      </div>

      {/* Main Content */}
      <main className="w-full flex justify-center">
        {favoriteMovies.length > 0 && isLoggedIn ? (
          <div className="max-w-7xl w-full">
            <CardSection movies_data={favoriteMovies} />
          </div>
        ) : (
          <div
            style={{ width: "100%", height: "calc(100vh - 150px)" }}
            className="flex items-center justify-center"
          >
            <p className="text-2xl font-bold text-gray-600 text-center mt-10">
              Your list is empty. Add some movies and TV shows to get started!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
