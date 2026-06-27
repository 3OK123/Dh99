import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ===== DB =====
mongoose.connect("mongodb://127.0.0.1:27017/streaming");

// ===== Model =====
const Series = mongoose.model("Series", new mongoose.Schema({
  title: String,
  description: String,
  poster: String,
  episodes: [
    {
      number: Number,
      title: String,
      video: String
    }
  ]
}));

// ===== Upload =====
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "video/mp4") cb(null, true);
    else cb(new Error("MP4 only"));
  }
});

// ===== APIs =====
app.post("/series", async (req, res) => {
  res.json(await Series.create(req.body));
});

app.get("/series", async (req, res) => {
  res.json(await Series.find());
});

app.post("/episode/:id", upload.single("video"), async (req, res) => {
  const s = await Series.findById(req.params.id);

  s.episodes.push({
    number: req.body.number,
    title: req.body.title,
    video: req.file.filename
  });

  await s.save();
  res.json(s);
});

// ===== Start =====
app.listen(5000, () => console.log("Server running"));