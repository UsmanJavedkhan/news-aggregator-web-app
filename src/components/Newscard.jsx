import React from "react";

export default function NewsCard({ data,onRead }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col overflow-hidden">
      {/* Image */}
  <img
  src={data.urlToImage || `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`}
  alt={data.title}
  className="h-40 w-full object-cover"
  onError={(e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`;
  }}
/>


      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-base font-semibold mb-2 line-clamp-2">
          {data.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {data.description}
        </p>

        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <span>{data.source?.name}</span>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onRead(data)}
            className="text-blue-600 hover:underline font-medium"
          >
            Read →
          </a>
        </div>
      </div>
    </div>
  );
}
