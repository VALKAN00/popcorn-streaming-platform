// icons imports
import popcornIcon from "../../assets/icons/popcorn.png";
import SearchAppBar from "./Searchbar.jsx";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// React Router imports
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/*menu imports */
import BasicMenu from "./Menu.tsx";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const loginFlag = JSON.parse(localStorage.getItem("loginStatus")) || false;
  const handleLogout = () => {
    localStorage.setItem("loginStatus", JSON.stringify(false));
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="sticky top-0 z-[1000] w-full backdrop-blur-md transition-colors duration-200"
      style={{
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 lg:px-12 gap-6 sm:gap-4 space-x-5">
        {/* Left: Logo, Brand, and Navigation */}
        <div className="flex items-center gap-3">
          <img
            src={popcornIcon}
            alt="Popcorn Logo"
            className="h-10 w-10 sm:h-12 sm:w-12"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-700">
            POPCORN
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-6">
            <ul className="flex flex-wrap gap-4 text-gray-400 text-base md:text-lg">
              {[
                { name: "Home", to: "/" },
                { name: "Movies", to: "/movies" },
                { name: "TV Shows", to: "/tv-shows" },
                { name: "Categories", to: "/categories" },
                { name: "My List", to: "/my-list" },
                { name: "Favorites", to: "/favorites" },
                { name: "Plans", to: "/plans" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right: Search, Profile/Menu, and Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <SearchAppBar />

          {/* User Menu */}
          {loginFlag ? (
            <BasicMenu
              handleLogout={handleLogout}
              handleLogin={handleLogin}
              item1="Profile"
              item2="Settings"
              item3="Sign Out"
              postion="Header"
              icon1={
                <Link to="/profile" aria-label="Go to Profile">
                  <PersonIcon />
                </Link>
              }
              icon2={<SettingsIcon />}
              icon3={<LogoutIcon />}
            />
          ) : (
            <BasicMenu
              handleLogout={handleLogout}
              handleLogin={handleLogin}
              item1="Login"
              item2="Register"
              postion="Header"
            />
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <nav className="md:hidden px-4 pb-4 text-gray-300">
          <ul className="flex flex-col gap-3 text-lg">
            {[
              { name: "Home", to: "/" },
              { name: "Movies", to: "/movies" },
              { name: "TV Shows", to: "/tv-shows" },
              { name: "Categories", to: "/categories" },
              { name: "My List", to: "/my-list" },
              { name: "Favorites", to: "/favorites" },
              { name: "Plans", to: "/plans" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-1 hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
