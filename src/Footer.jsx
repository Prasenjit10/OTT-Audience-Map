import React from "react";
import { FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-purple-900 text-purple-100 py-6 px-8 text-center md:text-left">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

        {/* Left side - Social Links */}
        <div className="flex items-center gap-5 text-xl">
          
          {/* Portfolio */}
          <a 
            href="https://prasenjit-portfolio.vercel.app" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 transition"
          >
            <FaGlobe />
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/prasenjit-sasmal" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 transition"
          >
            <FaLinkedin />
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/prasenjit_sasmal01" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 transition"
          >
            <FaInstagram />
          </a>

        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white">
          OTT Audience Map
        </h3>

        {/* Copyright */}
        <p className="text-sm text-purple-300">
          © {new Date().getFullYear()} OTT Audience Map. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
