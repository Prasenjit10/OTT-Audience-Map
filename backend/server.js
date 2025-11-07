import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import { spawn } from "child_process";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer setup — stores uploaded XLSX files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* ---------------------------------------------------------
 ✅ Upload XLSX File → Send to Python → Get Clusters
----------------------------------------------------------*/
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;
  console.log("📂 File uploaded:", filePath);

  const pythonProcess = spawn("python", ["model/run_model.py", filePath]);

  let pythonData = "";
  let pythonError = "";

  pythonProcess.stdout.on("data", (data) => (pythonData += data.toString()));
  pythonProcess.stderr.on("data", (data) => (pythonError += data.toString()));

  pythonProcess.on("close", () => {
    if (pythonError) {
      console.error("❌ Python Error:", pythonError);
      return res.status(500).json({ error: pythonError });
    }

    try {
      res.json(JSON.parse(pythonData));
    } catch {
      console.error("❌ Invalid Python Output:", pythonData);
      res.status(500).json({ error: "Invalid model output" });
    }
  });
});

/* ---------------------------------------------------------
 ❌ REMOVED — Predict API (NOT BUILT YET)
----------------------------------------------------------*/
// app.post("/predict", (...args) => {})

/* ---------------------------------------------------------
 ✅ Serve Frontend Build
----------------------------------------------------------*/
app.use(express.static(path.join(process.cwd(), "dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

/* ---------------------------------------------------------
 ✅ Start Server
----------------------------------------------------------*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
