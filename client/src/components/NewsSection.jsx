import React from "react";

const newsData = [
  { id: 1, title: "AI in Education: How It's Changing Learning" },
  { id: 2, title: "CBSE Announces New Syllabus for 2025" },
  { id: 3, title: "Top 10 Apps for Smart Study in 2025" },
];

const NewsSection=()=> {
  return (
    <div id="news" className="my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest News 📰</h2>
      <div className="space-y-3">
        {newsData.map((news) => (
          <div key={news.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700">{news.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsSection