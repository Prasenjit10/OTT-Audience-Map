import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/70 border-b border-purple-200/30 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-110 transition">
            O
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            OTT Audience Map
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex gap-3">
          <a
            href="#About"
            className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 bg-purple-100/60 hover:bg-purple-200/80 hover:text-purple-700 transition-all shadow-sm"
          >
            Overview
          </a>

          <a
            href="#upload"
            className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            Upload Data
          </a>
        </div>

      </div>
    </nav>
  );
}
