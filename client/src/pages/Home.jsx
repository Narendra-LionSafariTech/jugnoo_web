import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import Advertisement from "../components/Advertisement";
import NewsSection from "../components/NewsSection";
import SportsSection from "../components/SportsSection";
import CricketScore from "../components/CricketScore";
import BottomNav from "../components/BottomNav";

const HomePage=()=> {
  return (
    <div className="bg-gradient-to-br from-yellow-100 via-orange-50 to-teal-100 min-h-screen">
      <Navbar />
      <HeroBanner />
      <Advertisement />
      <div className="px-4">
        <NewsSection />
        <SportsSection />
        <CricketScore />
      </div>
      <BottomNav />
    </div>
  );
}


export default HomePage