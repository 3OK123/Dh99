import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/streaming");

// ====== 2- Database Schema ======
const SeriesSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,
  year: Number,
  poster: String,
  episodes: [
    {
      number: Number,
      title: String,
      video: String,
    },
  ],
});

const Series = mongoose.model("Series", SeriesSchema);

// ====== 3- Upload System ======
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "video/mp4") cb(null, true);
    else cb(new Error("Only MP4 allowed"));
  },
});

// ====== 4- APIs ======
app.post("/series", async (req, res) => {
  const data = await Series.create(req.body);
  res.json(data);
});

app.get("/series", async (req, res) => {
  res.json(await Series.find());
});

app.post("/upload/:id", upload.single("video"), async (req, res) => {
  const series = await Series.findById(req.params.id);

  series.episodes.push({
    number: req.body.number,
    title: req.body.title,
    video: req.file.filename,
  });

  await series.save();

  res.json(series);
});

// ====== 5- Start Server ======
app.listen(5000, () => console.log("Server running on 5000"));
