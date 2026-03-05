import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("isAuthenticated", { path: "/" });
    Cookies.remove("userName", { path: "/" });

    navigate("/auth/login");
  };

  return (
    <header className="flex items-center justify-end px-6 h-16 bg-white border-b border-gray-200">

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
      >
        Logout
      </button>

    </header>
  );
};

export default Header;