import React, { useState } from "react";
import AboutImage from "./assets/aboutsection.png";

export default function About() {
  const [info, setInfo] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="px-8 md:px-20 py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Text Block */}
          <div className="space-y-5">
            <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800 leading-tight">
              Explore Viewer Behavior &  
              <span className="block text-purple-600 mt-1">OTT Trends Instantly</span>
            </h2>

            <p className="text-gray-700 text-lg">
              Upload your viewership dataset and uncover smart clusters based on
              OTT preferences, genre choices, language affinity, and binge habits.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
              <div className="bg-white p-4 shadow rounded-lg border border-purple-200">
                🎯 Smart Viewer Segments
              </div>
              <div className="bg-white p-4 shadow rounded-lg border border-purple-200">
                📊 Genre & Platform Insights
              </div>
              <div className="bg-white p-4 shadow rounded-lg border border-purple-200">
                🤖 AI-Powered Clustering
              </div>
              <div className="bg-white p-4 shadow rounded-lg border border-purple-200">
                ⚡ Quick Results
              </div>
            </div>

            <button
              onClick={() => setInfo(true)}
              className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition"
            >
              How does it work?
            </button>
          </div>

          {/* Image Block */}
          <div className="flex justify-center">
            <img
              src={AboutImage}
              alt="Viewer segmentation"
              className="rounded-xl shadow-lg w-4/5 md:w-3/4 hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </section>

      {/* Process Modal */}
      {info && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-6 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 animate-fadeIn">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-800">
                Viewer Insight Process
              </h3>
              <button onClick={() => setInfo(false)} className="text-2xl">×</button>
            </div>

            <ol className="border-l-2 border-purple-600 space-y-6 pl-6 text-gray-700">
              <li>
                <span className="font-semibold text-purple-700">Upload Data</span>
                <p className="text-sm">Add your CSV with viewer preference attributes.</p>
              </li>
              <li>
                <span className="font-semibold text-purple-700">AI Clustering</span>
                <p className="text-sm">System groups students/users with similar OTT behavior.</p>
              </li>
              <li>
                <span className="font-semibold text-purple-700">View Result</span>
                <p className="text-sm">Get clean segmented clusters to analyze audience tastes.</p>
              </li>
            </ol>

            <div className="mt-6">
              <button
                className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                onClick={() => {
                  setInfo(false);
                  document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Upload Dataset & Get Insights
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
