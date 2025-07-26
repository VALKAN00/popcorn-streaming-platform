import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function AccountSettings() {
  const navigate = useNavigate();
  const [loginFlag, setLoginFlag] = useState(false);
  const [userData, setUserData] = useState({
    email: "POPCORN@gmail.com",
    username: "POPCORN",
  });

  // Safely access localStorage on mount
  useEffect(() => {
    const loginStatus =
      JSON.parse(localStorage.getItem("loginStatus")) || false;
    setLoginFlag(loginStatus);

    if (loginStatus) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUserData(storedUser);
      }
    }
  }, []);

  if (!loginFlag) {
    return (
      <div className="text-white text-center mt-10">
        <h2 className="text-2xl font-bold">You are not logged in.</h2>
      </div>
    );
  }

  return (
    <div className="Account-Details bg-black/40 mt-10 shadow-lg text-white rounded-lg w-[95%] sm:w-[90%] max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
        Account Details
      </h2>

      <div className="info ml-2 sm:ml-4 md:ml-6 space-y-6">
        <div>
          <p className="text-gray-400 text-lg sm:text-xl mb-1">Email</p>
          <p className="text-xl sm:text-2xl break-all">{userData.email}</p>
        </div>

        <div>
          <p className="text-gray-400 text-lg sm:text-xl mb-1">Username</p>
          <p className="text-xl sm:text-2xl break-words">{userData.username}</p>
        </div>

        <button className="cursor-pointer bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold py-2 px-6 rounded transition duration-300 w-full sm:w-auto">
          Change Password
        </button>
      </div>

      <hr className="my-8 sm:my-10 border-gray-700 w-[90%] mx-auto" />

      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Membership & Billing
      </h2>

      <div className="ml-2 sm:ml-4 md:ml-6 space-y-4">
        <p className="text-lg sm:text-xl">
          Your current plan:{" "}
          <span
            className={`font-bold ${
              userData.plan === "Basic"
                ? "text-gray-400"
                : userData.plan === "Premium"
                ? "text-red-500"
                : userData.plan === "Luxury"
                ? "text-yellow-400"
                : "text-white"
            }`}
          >
            {userData.plan}
          </span>
        </p>

        <button
          onClick={() => navigate("/plans")}
          className="cursor-pointer bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold py-2 px-6 rounded transition duration-300 w-full sm:w-auto"
        >
          Change Plan
        </button>
      </div>
    </div>
  );
}

function PlaybackSettings() {
  const [loginFlag, setLoginFlag] = useState(false);
  useEffect(() => {
    const loginStatus =
      JSON.parse(localStorage.getItem("loginStatus")) || false;
    setLoginFlag(loginStatus);
  }, []);

  if (!loginFlag) {
    return (
      <div className="text-white text-center mt-10">
        <h2 className="text-2xl font-bold">You are not logged in.</h2>
      </div>
    );
  }
  return (
    <div className="playback-settings bg-black/40 mt-10 shadow-lg text-white rounded-lg w-[90%] max-w-5xl h-auto mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-10">
        Playback Settings
      </h2>

      <div className="info space-y-10">
        <div className="playback-info flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white text-xl">Autoplay next episode</p>
          <label className="switch">
            <input type="checkbox" id="autoplay-next" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="playback-info flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white text-xl">Autoplay previews</p>
          <label className="switch">
            <input type="checkbox" id="autoplay-previews" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>

        <div>
          <label htmlFor="video-quality" className="text-lg block mb-2">
            Video Quality
          </label>
          <select
            id="video-quality"
            className="w-full p-3 bg-gray-900/50 rounded-lg border border-gray-700 text-white focus:border-red-500 focus:ring-red-500 focus:outline-none transition"
            style={{ cursor: "pointer" }}
          >
            <option className="bg-gray-900/60 text-white">Auto</option>
            <option className="bg-gray-900/60 text-white">Low</option>
            <option className="bg-gray-900/60 text-white">Medium</option>
            <option className="bg-gray-900/60 text-white">High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const [loginFlag, setLoginFlag] = useState(false);
  useEffect(() => {
    const loginStatus =
      JSON.parse(localStorage.getItem("loginStatus")) || false;
    setLoginFlag(loginStatus);
  }, []);

  if (!loginFlag) {
    return (
      <div className="text-white text-center mt-10">
        <h2 className="text-2xl font-bold">You are not logged in.</h2>
      </div>
    );
  }
  return (
    <div className="notification-settings bg-black/40 mt-10 shadow-lg text-white rounded-lg w-[90%] max-w-5xl h-auto mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-10">
        Notification Settings
      </h2>

      <div className="info space-y-10">
        <div className="notifications flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white text-xl">Email me with updates and offers</p>
          <label className="switch">
            <input type="checkbox" id="email-me-with-updates" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="notifications flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white text-xl">
            Push notifications for new releases
          </p>
          <label className="switch">
            <input
              type="checkbox"
              id="notifications-for-new-releases"
              defaultChecked
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings />;
      case "playback":
        return <PlaybackSettings />;
      case "notifications":
        return <NotificationSettings />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <main className="sidebar-section flex flex-col md:flex-row w-full min-h-screen ">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 border-b md:border-b-0 md:border-r border-white p-6 flex flex-col items-center">
        <p className="text-4xl md:text-6xl font-bold mb-6">Settings</p>
        <div className="flex flex-col space-y-4 w-full">
          {["account", "playback", "notifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-bold py-2 px-4 rounded text-center w-full border text-gray-400 hover:bg-gray-800/50 hover:scale-105 transition-transform duration-300 ${
                activeTab === tab ? "bg-gray-800/70 text-white" : ""
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-4/5 p-4 flex items-start justify-center overflow-auto">
        {renderTabContent()}
      </div>
    </main>
  );
}
