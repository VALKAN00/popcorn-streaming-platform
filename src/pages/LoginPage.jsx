import Typography from "@mui/material/Typography";
import popcornIcon from "../assets/icons/popcorn.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Toast from "../components/common/Toast.jsx";

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Simple validation
    if (!username.trim() || !password.trim()) {
      setToastMessage("Please enter both username and password.");
      setToastSeverity("warning");
      setOpenToast(true);
      return;
    }

    // Check credentials
    if (
      storedUser &&
      storedUser.username === username.trim() &&
      storedUser.password === password
    ) {
      localStorage.setItem("loginStatus", JSON.stringify(true));
      setToastMessage("Login successful!");
      setToastSeverity("success");
      setOpenToast(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      localStorage.setItem("loginStatus", JSON.stringify(false));
      setToastMessage("Invalid username or password.");
      setToastSeverity("error");
      setOpenToast(true);
    }
  };
  return (
    <div
      className="login-page w-full sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%] mx-auto mt-10 px-6 py-10 flex flex-col items-center justify-center rounded-2xl border border-gray-700 bg-gradient-to-t from-black via-black/95 to-black/90 shadow-lg backdrop-blur-sm"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="w-full max-w-2xl bg-black/80 rounded-xl shadow-xl p-8 sm:p-10 md:p-12"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-red-700 text-transparent bg-clip-text flex items-center justify-center gap-3">
            POPCORN
            <img
              src={popcornIcon}
              alt="Popcorn Logo"
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl mt-2">Welcome back</p>
        </div>

        <form
          className="flex flex-col space-y-6 w-full max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-800/70 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:outline-none transition"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-800/70 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:outline-none transition"
            required
          />
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-red-800/20"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            className="text-sm sm:text-base text-gray-400 hover:text-white transition"
            onClick={() => navigate("/register")}
          >
            Need an account? Sign Up
          </button>
        </div>
      </div>

      <Toast
        open={openToast}
        onClose={handleCloseToast}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
}
