import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { ChevronsUpDown } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

export default function BasicMenu({
  item1,
  item2,
  item3,
  postion,
  name,
  icon1,
  icon2,
  icon3,
  handleLogout,
}) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRegister = () => {
    handleClose();
    if (item2 === "Register") {
      navigate("/register");
    }
  };

  const handleLogin = () => {
    handleClose();
    if (item1 === "Login") {
      navigate("/login");
    }
  };
  const handleProfile = () => {
    handleClose();
    if (item1 === "Profile") {
      navigate("/profile");
    }
  };
  const handleSettings = () => {
    handleClose();
    if (item2 === "Settings") {
      navigate("/settings");
    }
  };

  const handleSignOut = () => {
    handleClose();
    if (item3 === "Sign Out") {
      handleLogout();
      
    }
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const [userData, setUserData] = useState({
    email: "",
    username: "P",
    favorites: [],
    mylist: [],
    password: "",
  });

  const storedLoginStatus =
    JSON.parse(localStorage.getItem("loginStatus")) || false;
  useEffect(() => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem("user"));

      if (storedLoginStatus && storedUserData) {
        setUserData({
          email: storedUserData.email || "",
          username: storedUserData.username || "P",
          favorites: storedUserData.favorites || [],
          mylist: storedUserData.mylist || [],
          password: storedUserData.password || "",
        });
      }
    } catch (error) {
      console.error("Error loading user data from localStorage:", error);
    }
  }, [storedLoginStatus]);

  return (
    <div>
      {postion === "Header" ? (
        <button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar className="bg-gradient-to-r from-blue-500 to-red-700">
            {userData.username.charAt(0).toUpperCase()}
          </Avatar>
        </button>
      ) : (
        <button
          id="basic-button2"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="flex items-center gap-2 bg-gray-800/70 text-white border border-gray-700 rounded-lg py-2 px-6 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
        >
          {name}
          <ChevronsUpDown />
        </button>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          onClick={
            item1 === "Login"
              ? handleLogin
              : item1 === "Profile"
              ? handleProfile
              : handleClose
          }
        >
          {icon1}
          {item1}
        </MenuItem>
        <MenuItem
          onClick={
            item2 === "Register"
              ? handleRegister
              : item2 === "Settings"
              ? handleSettings
              : handleClose
          }
        >
          {icon2}
          {item2}
        </MenuItem>
        {storedLoginStatus && (
          <MenuItem onClick={handleSignOut}>
            {icon3}
            {item3}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
