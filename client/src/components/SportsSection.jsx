import React from "react";

const sportsData = [
  { id: 1, title: "Inter-School Cricket Tournament Announced!" },
  { id: 2, title: "Chess Championship Finals Next Week" },
  { id: 3, title: "Football Coaching Camp for Beginners" },
];

const SportsSection=()=> {
  return (
    <div id="sports" className="my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sports Corner ⚽🏏</h2>
      <div className="space-y-3">
        {sportsData.map((sport) => (
          <div key={sport.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700">{sport.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SportsSection