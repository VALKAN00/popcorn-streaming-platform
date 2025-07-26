import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react"; 

import {useNavigate} from 'react-router-dom';

const profileData = {
  name: "User",
  avatarUrl: "https://via.placeholder.com/150",
  firstLetter: "P",
};
export default function ProfilePage() {
  const navigate = useNavigate();
 
 
  // login status from local storage
  const [userDataState, setUserDataState] = useState(profileData);
  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage.getItem("loginStatus")) || false;
    setLoggedIn(loginStatus);

    if (loginStatus) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUserDataState(storedUser);
      }
    }
  } , [LoggedIn]);

  if (!LoggedIn) {
    return (
      <div className="text-white text-center mt-10 flex items-center justify-center" style={{ width: "100%", height: "70vh" }}>
        <h2 className="text-5xl font-bold">You are not logged in.</h2>
      </div>
    );
  }

  return (
    <div>
      <main className="ProfilePage flex flex-col items-center justify-center space-y-5" style={{width: "100%", height: "calc(100vh - 200px)"}}>
        <div>
          <h1 className="text-6xl font-bold text-center mt-10 text-white">
            Who's Watching?
          </h1>
        </div>
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-4 border-transparent hover:transform hover:scale-110 transition-transform duration-300 ease-in-out">
          <Avatar sx={{ bgcolor: "#991b1b" }} style={{ width: "100%", height: "100%",fontSize: "3rem" }} variant="square">
            {LoggedIn? userDataState.username.charAt(0).toUpperCase() : profileData.firstLetter} 
          </Avatar>
        </div>
        <p className="text-gray-300 group-hover:text-white transition" style={{ fontSize: "1.5rem" }}>
          {LoggedIn ? userDataState.username : profileData.name}
        </p>
        <div className="flex space-x-4">
          <button onClick={() => navigate("/settings")}  className="cursor-pointer mt-12 bg-transparent border border-gray-500 text-gray-400 hover:bg-white hover:text-black hover:border-white font-bold py-2 px-8 rounded-lg transition">
            Manage Profiles
          </button>
        </div>
      </main>
    </div>
  );
}
