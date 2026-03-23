import express from "express";
import Project from "../models/projects.js";

const router = express.Router();

//fetch all saved projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .select("name createdAt classes errors");

    return res.status(200).json({ projects });
  } catch (err) {
    console.error("Projects GET Error:", err.message);
    return res.status(500).json({ error: "Failed to fetch projects." });
  }
});

//Fetch a Single project by id
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json({ project });
  } catch (err) {
    console.log("[ID Error]", err.message);
    return res.status(500).json({ error: "Failed to fetch project" });
  }
});

//Save a new project
router.post("/", async (req, res) => {
  try {
    const { name, javaCode, nodes, edges, classes, errors } = req.body;

    if (!name || !javaCode) {
      return res
        .status(400)
        .json({ error: "Project name and Java code are required." });
    }

    const project = new Project({
      name,
      javaCode,
      nodes,
      edges,
      classes,
      errors,
    });
    await project.save();

    return res.status(201).json({
      message: "Project saved successfully",
      project,
    });
  } catch (err) {
    console.error("POST Error:", err.message);
    return res.status(500).json({ error: "Failed to save the project" });
  }
});

//Delete project by id
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json({ message: "Project deleted Successfully " });
  } catch (err) {
    console.error("DELETE Error:", err.message);
    return res.status(500).json({ error: "Failed to delete Project" });
  }
});

export default router;
