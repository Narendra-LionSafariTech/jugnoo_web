import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaNewspaper } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";
import { getRequest } from "../services/common.services";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

const NewsAndCricketWidget = ({ title = "Sports" }) => {
  const [news, setNews] = useState([]);
  const [cricket, setCricket] = useState([]);

  const sportData = async () => {
    try {
      const response = await getRequest(`/sports/cricket/current`);
      if (response.status === 200) {
        const data = response?.data?.matches || [];
        setCricket(data);
      }
    } catch (error) {
      console.log("Cricket API Error:", error);
    }
  };

  const newsData = async () => {
    try {
      const response = await getRequest(`/news/news?category=sports`);
      if (response.status === 200) {
        const data = response?.data?.articles || [];
        setNews(data);
      }
    } catch (error) {
      console.log("News API Error:", error);
    }
  };

  useEffect(() => {
    sportData();
    newsData();
  }, []);

  const NewsSection = (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-10"
    >
      <h2 className="text-3xl font-bold text-teal-600 flex items-center gap-2 mb-6">
        <FaNewspaper className="text-yellow-500" /> Sports News 📰
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(0, 6).map((n, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg p-4 border-l-4 border-yellow-400"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {n.title}
            </h3>
            <p className="text-sm text-gray-600">
              {n.description?.slice(0, 80)}...
            </p>
            <a
              href={n.url}
              target="_blank"
              rel="noreferrer"
              className="text-teal-600 font-bold text-sm mt-2 inline-block"
            >
              Read More →
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const CricketSection = (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-teal-600 flex items-center gap-2 mb-6">
        <GiCricketBat className="text-green-600" /> Live Cricket 🏏
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cricket.slice(0, 6).map((match, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-yellow-100 via-white to-green-50 rounded-2xl shadow-lg p-5"
          >
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              {match.name}
            </h3>
            <p className="text-sm text-gray-700 mb-2">{match.status}</p>

            {/* Team Logos */}
            <div className="flex items-center justify-between mb-3">
              {match.teamInfo?.map((team, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={team.img}
                    alt={team.name}
                    className="w-12 h-12 rounded-full shadow-md"
                  />
                  <p className="text-sm font-semibold mt-1 text-gray-700">
                    {team.shortname || team.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Score Display */}
            <div className="bg-white rounded-xl shadow-inner p-3">
              {match.score?.map((s, idx) => (
                <p
                  key={idx}
                  className="text-sm text-gray-800 font-medium mb-1"
                >
                  <span className="font-bold">{s.inning}:</span> {s.r}/{s.w} in{" "}
                  {s.o} overs
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div>
      <Navbar />
      <div className="px-4 py-10 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        {title === "Sports" ? (
          <>
            {CricketSection}
            {NewsSection}
          </>
        ) : (
          <>
            {NewsSection}
            {CricketSection}
          </>
        )}
      </div>
      <BottomNav/>
    </div>

  );
};

export default NewsAndCricketWidget;
