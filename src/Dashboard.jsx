// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    if (state && state.data && state.data.clusters) {
      setClusters(state.data.clusters);
      localStorage.setItem("clusters", JSON.stringify(state.data.clusters));
    } else {
      const saved = localStorage.getItem("clusters");
      if (saved) setClusters(JSON.parse(saved));
    }
  }, [state]);

  const handleUploadNewFile = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  if (!clusters || clusters.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full border border-purple-200">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">No Audience Data</h2>
          <p className="text-purple-600 mb-6">
            Upload OTT viewer dataset to generate audience segments.
          </p>
          <button
            onClick={handleUploadNewFile}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Upload New File
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-14 px-4 bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-10 text-purple-800">
          🎯 OTT Audience Segments
        </h1>

        {/* Cluster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {clusters.slice(0, 4).map((cluster, idx) => (
            <div
              key={cluster.cluster_id}
              className="bg-white border border-purple-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-3 text-purple-700">
                Segment {idx + 1}
              </h3>

              {/* Names */}
              <div className="flex flex-wrap gap-2">
                {cluster.students.map((user, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    {user.name || `User ${i + 1}`}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-purple-600">
                {cluster.students.length} audience member
                {cluster.students.length > 1 ? "s" : ""}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={handleUploadNewFile}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Upload New File
          </button>
        </div>

      </div>
    </div>
  );
}
