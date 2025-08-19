import React from "react";
import { motion } from "framer-motion";

const HeroBanner=() =>{
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      id="home"
      className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white text-center py-16 px-4"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Bright Learning with Jugnoo ✨
      </h1>
      <p className="text-lg md:text-xl max-w-xl mx-auto">
        Your one-stop platform for education, sports updates, and fun learning
        for students from age 1 to 18!
      </p>
      <button className="mt-6 px-6 py-3 bg-yellow-400 rounded-lg font-bold text-gray-800 shadow-lg hover:bg-yellow-500">
        Get Started
      </button>
    </motion.div>
  );
}

export default HeroBanner