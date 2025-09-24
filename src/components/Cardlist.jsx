import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./Newscard";
import TrendingSection from "./TrendingSection";
import SearchBar from "./SearchBar";
import CategoryDropdown from "./CategoryDropdown";
import { HistoryMenu } from "./Drawer";

const API_URL = import.meta.env.VITE_NEWS_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function Cardlist() {
  const [newsData, setNewsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("news"); 
  const [category, setCategory] = useState(""); 
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [savedFeeds, setSavedFeeds] = useState(
    JSON.parse(localStorage.getItem("savedFeeds")) || []
  );

  const pageSize = 8;
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("newsHistory")) || [];
  });
  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("searchHistory")) || [];
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedName, setFeedName] = useState("");

  const saveFeed = (feed) => {
    setSavedFeeds((prev) => {
      const updated = [...prev, feed];
      localStorage.setItem("savedFeeds", JSON.stringify(updated));
      return updated;
    });
  };

  // Save new search (recent searches)
  const saveSearch = (query, from, to) => {
    const newSearch = { query, from, to };

    setSearchHistory((prev) => {
      const updated = [
        newSearch,
        ...prev.filter(
          (s) => !(s.query === query && s.from === from && s.to === to)
        ),
      ].slice(0, 5);

      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  const getNewsData = async () => {
    let API = "";
    if (category) {
      API = `${API_URL}/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;
    } else {
      API = `${API_URL}/everything?q=${encodeURIComponent(
        searchQuery
      )}&sortBy=publishedAt&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;
      if (fromDate) API += `&from=${fromDate}`;
      if (toDate) API += `&to=${toDate}`;
    }

    try {
      const res = await axios.get(API);
      setNewsData(res.data.articles);
      setTotalResults(res.data.totalResults);
    } catch (e) {
      console.error(e);
    }
  };

  const addToHistory = (article) => {
    setHistory((prev) => {
      const updated = [article, ...prev.filter((a) => a.url !== article.url)];
      localStorage.setItem("newsHistory", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    getNewsData();
  }, [page, searchQuery, category]);

  const totalPages = Math.ceil(totalResults / pageSize);
  const maxPageButtons = 5;
  const startPage =
    Math.floor((page - 1) / maxPageButtons) * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Side */}
      <div className="lg:col-span-3">
        <HistoryMenu history={history} setHistory={setHistory} />

        {/* Search & Save Feed */}
        <div className="flex items-center space-x-2">
          <SearchBar
            onSearch={(query, from, to) => {
              setSearchQuery(query || "news");
              setFromDate(from);
              setToDate(to);
              setCategory("");
              setPage(1);

              if (query && query.trim() !== "") {
                saveSearch(query, from, to);
              }
            }}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 mb-6 rounded-md hover:bg-green-700"
          >
            Save Feed
          </button>
        </div>

        {/* Saved Feeds */}
        {savedFeeds.length > 0 && (
          <div className="mt-4 bg-gray-50 p-3 rounded-lg shadow">
            <h3 className="text-sm font-semibold mb-2">Saved Feeds</h3>
            <ul className="space-y-2">
              {savedFeeds.map((feed, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm"
                >
                  <span className="text-sm text-gray-700">
                    📌 {feed.name}
                   
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSearchQuery(feed.query);
                        setFromDate(feed.from);
                        setToDate(feed.to);
                        setCategory(feed.category);
                        setPage(1);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => {
                        const updated = savedFeeds.filter((_, i) => i !== index);
                        setSavedFeeds(updated);
                        localStorage.setItem(
                          "savedFeeds",
                          JSON.stringify(updated)
                        );
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Category Dropdown */}
        <CategoryDropdown
          selectedCategory={category}
          onChange={(cat) => {
            setCategory(cat);
            setSearchQuery("news");
            setPage(1);
          }}
        />

        {/* News Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {newsData.map((item, index) => (
            <NewsCard key={index} data={item} onRead={addToHistory} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2 items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 rounded-md border transition-colors ${
              page === 1
                ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
            }`}
          >
            ←
          </button>

          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-1 rounded-md border transition-colors ${
                pageNum === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-3 py-1 rounded-md border transition-colors ${
              page === totalPages
                ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
            }`}
          >
            →
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="lg:col-span-1">
        <TrendingSection addToHistory={addToHistory} />
      </div>

      {/* Save Feed Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Save Feed</h2>
            <input
              type="text"
              value={feedName}
              onChange={(e) => setFeedName(e.target.value)}
              placeholder="Enter feed name"
              className="w-full border rounded-md px-3 py-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (feedName.trim() !== "") {
                    saveFeed({
                      name: feedName,
                      query: searchQuery,
                      from: fromDate,
                      to: toDate,
                      category,
                    });
                    setFeedName("");
                    setIsModalOpen(false);
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cardlist;
