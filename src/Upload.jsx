import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsProcessing(true);
    try {
      const response = await axios.post(
        "https://ott-audience-map.onrender.com/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      navigate("/dashboard", { state: { data: response.data } });
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-3">
            Upload OTT Survey Dataset 🎬
          </h1>
          <p className="text-purple-700 text-lg">
            Upload viewer preferences to generate smart OTT audience clusters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ✅ Left Side — ONLY text + button (no box) */}
          <div className="p-2">
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">
              📘 Instructions
            </h2>

            <ul className="space-y-3 text-purple-700 text-lg">
              <li>✔ Upload CSV file</li>
              <li>✔ Must follow sample format</li>
              <li>✔ No empty values</li>
              <li>✔ Click below to view sample</li>
            </ul>

            <button
              onClick={() => setShowSample(true)}
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
            >
              View Sample Format
            </button>
          </div>

          {/* ✅ Upload Box (unchanged) */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-200 flex flex-col relative">
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">
               Upload Dataset
            </h2>

            <p className="text-purple-700 mb-6">
              Choose your OTT audience dataset CSV to generate clusters.
            </p>

            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full border border-purple-300 rounded-lg p-2 file:bg-purple-100 file:text-purple-700 file:py-2 file:px-3 file:rounded file:border-0"
            />

            {/* ✅ Green Tick after upload */}
            {file && (
              <div className="absolute top-2 right-2 text-green-600 text-2xl font-bold animate-bounce">
                ✓
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={isProcessing}
              className={`mt-6 w-full text-white px-6 py-4 rounded-lg font-semibold text-lg transition ${
                isProcessing ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {isProcessing ? "Processing..." : "Upload & Generate Clusters"}
            </button>

            <p className="mt-6 text-center text-sm text-purple-600">
              Your data is processed securely & never stored ✔️
            </p>
          </div>
        </div>
      </div>

      {/* 📄 Sample modal */}
      {showSample && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-6 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 animate-fadeIn">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-800">
                Sample CSV Format
              </h3>
              <button onClick={() => setShowSample(false)} className="text-2xl">×</button>
            </div>

            <div className="bg-purple-50 rounded-lg border border-purple-200 p-4 overflow-x-auto">
              <pre className="text-xs font-mono text-purple-800 leading-relaxed">
{`name,movie_genre_top1,series_genre_top1,ott_top1,content_lang_top1
Aritra,Action,K-Drama,Netflix,Hindi
Sneha,Romance,Anime,Crunchyroll,Japanese
Ravi,Thriller,Documentary,Amazon Prime,English`}
              </pre>
            </div>

            <button
              className="w-full mt-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              onClick={() => setShowSample(false)}
            >
              Close Sample
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Upload;
