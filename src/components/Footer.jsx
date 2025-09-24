import React from "react";
import { Facebook, Twitter, Linkedin, Mail, Newspaper } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">NewsHub</span>
          </div>
          <p className="text-sm text-gray-400">
            Stay informed with the latest headlines from multiple sources — all
            in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:text-blue-400 transition-colors">
                Categories
              </a>
            </li>
            <li>
              <a href="/trending" className="hover:text-blue-400 transition-colors">
                Trending
              </a>
            </li>
            <li>
              <a href="/saved" className="hover:text-blue-400 transition-colors">
                Saved Feeds
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">
            Subscribe to our newsletter to get the latest news straight to your
            inbox.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md focus:outline-none text-white border-2"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-[14px] rounded-r-md"
            >
              <Mail className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NewsHub. All rights reserved.
      </div>
    </footer>
  );
}
