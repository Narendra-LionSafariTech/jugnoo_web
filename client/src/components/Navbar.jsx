import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBug, FaHome, FaBook, FaInfoCircle,  FaServicestack, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = "flex items-center hover:text-teal-600 transition-colors duration-200";

  return (
    <div className="sticky top-0 bg-white shadow-md z-50">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-2">
          <FaBug className="text-yellow-500 text-2xl animate-bounce" />
          <span className="font-bold text-lg text-teal-600">Jugnoo EdTech</span>
        </div>

        <div className="hidden md:flex space-x-6 text-gray-700 font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-teal-600 font-bold" : ""}`
            }
          >
            <FaHome className="mr-1" /> Home
          </NavLink>
          <NavLink
            to="/sports"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-teal-600 font-bold" : ""}`
            }
          >
            <FaInfoCircle className="mr-1" /> Sports
          </NavLink>
          <NavLink
            to="/education-video"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-teal-600 font-bold" : ""}`
            }
          >
            <FaServicestack className="mr-1" /> Videos
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-teal-600 font-bold" : ""}`
            }
          >
            <FaBook className="mr-1" /> News
          </NavLink>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col items-start px-4 py-3 space-y-3 font-semibold text-gray-700">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-teal-600 font-bold" : ""}`
            }
          >
            <FaHome className="mr-1" /> Home
          </NavLink>
          <NavLink
            to="/sports"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-teal-600 font-bold" : ""}`
            }
          >
            <FaInfoCircle className="mr-1" /> Sports
          </NavLink>
          <NavLink
            to="/education-video"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-teal-600 font-bold" : ""}`
            }
          >
            <FaServicestack className="mr-1" /> Videos
          </NavLink>
          <NavLink
            to="/news"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "text-teal-600 font-bold" : ""}`
            }
          >
            <FaBook className="mr-1" /> News
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
