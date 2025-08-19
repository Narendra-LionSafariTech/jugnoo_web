import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBook, FaNewspaper } from "react-icons/fa"; 
import { FaBug, FaFootball } from "react-icons/fa6";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 w-full bg-white shadow-inner flex justify-around py-2 text-teal-600">
      <Link to="/" className="flex flex-col items-center">
        <FaHome /> <span className="text-xs">Home</span>
      </Link>
      <Link to="/news" className="flex flex-col items-center">
        <FaNewspaper /> <span className="text-xs">News</span>
      </Link>
      <Link to="/sports" className="flex flex-col items-center">
        <FaFootball /> <span className="text-xs">Sports</span>
      </Link>
      <Link to="/" className="flex flex-col items-center">
        <FaBook /> <span className="text-xs">About</span>
      </Link>
      <Link to="/education-video" className="flex flex-col items-center">
        <FaBug /> <span className="text-xs">Jugnoo</span>
      </Link>
    </div>
  );
};

export default BottomNav;
