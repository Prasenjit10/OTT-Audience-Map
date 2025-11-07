import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import About from "./About";
import Upload from "./Upload";
import Contact from "./Contact";
import Footer from "./Footer";
import Dashboard from "./Dashboard";

function App() {
  const [uploadedData, setUploadedData] = useState([]);

  return (
    <Routes>
      {/* Home page */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <section id="About">
              <About />
            </section>
            <section id="upload">
              <Upload setUploadedData={setUploadedData} />
            </section>
            <Footer />
          </>
        }
      />

      {/* Dashboard Page */}
      <Route path="/upload" element={<App />} /> 
      <Route path="/dashboard" element={<Dashboard data={uploadedData} />} />
    </Routes>
  );
}

export default App;
