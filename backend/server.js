import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import parseRoute from "./routes/parse.js";
import uploadRoute from "./routes/upload.js";
import projectsRoute from "./routes/projects.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

//Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/parse", parseRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/projects", projectsRoute);

//Health Check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "OOP Tree Visualizer API is running" });
});

//Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

//Error Handler
app.use((err, req, res, next) => {
  console.error("[Server Error]", err.stack);
  res.status(500).json({ error: err.message || "Internal Server error" });
});

//MONGODB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MONGODB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running at https://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB Connection Failed:", err.message);
    process.exit(1);
  });
