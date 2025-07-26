import BasicMenu from "../components/common/Menu.jsx";
import { List } from "lucide-react";
import { useContext } from "react";
import { MylistContext } from "../components/context/MylistContext.jsx";
import CardSection from "../components/common/CardSection.jsx";
import { Link } from "react-router-dom";
export default function MyListPage() {
  const { mylist } = useContext(MylistContext);

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
    <>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 px-4 sm:px-6 lg:px-12">
        <div className="flex items-center space-x-3">
          <List className="text-green-500" size={40} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            My List
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <BasicMenu
            item1={"Rating"}
            item2={"Title (A-Z)"}
            item3={"Title (Z-A)"}
            name={"Sort"}
          />
        </div>
      </div>

      {/* Main Section */}
      <main className="flex justify-center px-4 sm:px-6 lg:px-12 py-8 sm:py-10 w-full">
        {mylist.length > 0 && isLoggedIn ? (
          <div className="w-full max-w-7xl">
            <CardSection movies_data={mylist} type={"mylist"} />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full text-center">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-600 mt-10 px-4">
              Your list is empty. Add some movies and TV shows to get started!
            </p>
          </div>
        )}
      </main>
    </>
  );
}
