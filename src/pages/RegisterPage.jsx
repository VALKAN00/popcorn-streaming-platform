import Typography from "@mui/material/Typography";
import popcornIcon from "../assets/icons/popcorn.png";
import { useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast.jsx";
import { useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");

  const handleToastClose = () => {
    setToast(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!username || !email || !password || !isValidEmail(email)) {
      setToastMessage(
        "Please fill all fields and provide a valid email address."
      );
      setToastSeverity("error");
      setToast(true);
      return;
    }

    // Save user in localStorage
    const user = {
      username,
      email,
      password,
      favorites: [],
      mylist: [],
      plan: "Basic",
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loginStatus", JSON.stringify(true));

    // Show success toast
    setToastMessage("Registration successful!");
    setToastSeverity("success");
    setToast(true);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div
      className="register-page w-full sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%] mx-auto mt-10 px-6 py-10 flex flex-col items-center justify-center rounded-2xl border border-gray-700 bg-gradient-to-t from-black via-black/95 to-black/90 shadow-lg backdrop-blur-sm"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="w-full max-w-xl bg-black/80 rounded-xl p-8 sm:p-10 shadow-lg"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-red-700 text-transparent bg-clip-text flex items-center gap-3">
            POPCORN
            <img
              src={popcornIcon}
              alt="Popcorn Logo"
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl mt-2">
            Create your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 w-full max-w-md mx-auto"
        >
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 bg-gray-800/70 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:outline-none transition"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 bg-gray-800/70 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:outline-none transition"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 bg-gray-800/70 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:outline-none transition"
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-red-800/20"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login */}
        <div className="mt-6 text-center">
          <button
            className="text-sm sm:text-base text-gray-400 hover:text-white transition"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>

      {/* Toast */}
      <Toast
        open={toast}
        onClose={handleToastClose}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
}
