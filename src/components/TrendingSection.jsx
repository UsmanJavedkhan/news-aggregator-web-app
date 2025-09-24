import React, { useEffect, useState } from "react";

import axios from "axios";

const API_URL = import.meta.env.VITE_NEWS_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const categories = ["business", "entertainment", "general", "health", "science", "sports","technology"];

//   const[loading,setloading]=useState(false);


export default function TrendingSection({ addToHistory }) {
  const [trending, setTrending] = useState({});
  

  const fetchTrending = async () => {
    try {
      const results = {};
      for (let cat of categories) {
        const res = await axios.get(
          `${API_URL}/top-headlines?country=us&category=${cat}&pageSize=2&apiKey=${API_KEY}`
        );
        results[cat] = res.data.articles[0];
      }
      setTrending(results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleOpenArticle = (article) => {
    addToHistory(article);
    window.open(article.url, "_blank"); // open in new tab
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 sticky top-6 ">
      <h2 className="text-xl font-bold mb-4">Trending News</h2>
      <ul className="space-y-4">
        {categories.map(
          (cat) =>
            trending[cat] && (
              <li key={cat} className="flex items-start gap-3">
                <img
                  src={
                    trending[cat]?.urlToImage ||
                    `https://picsum.photos/200/200?random=${Math.floor(
                      Math.random() * 1000
                    )}`
                  }
                  alt={trending[cat]?.title || "Trending News"}
                  className="w-16 h-16 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/400/300?random=${Math.floor(
                      Math.random() * 1000
                    )}`;
                  }}
                />
                <div>
                  <p className="text-xs text-gray-500 capitalize">{cat}</p>
                  <button
                    onClick={() => handleOpenArticle(trending[cat])}
                    className="text-sm font-medium hover:underline text-left"
                  >
                    {trending[cat].title}
                  </button>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
