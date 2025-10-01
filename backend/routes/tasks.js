const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

//GET all tasks
router.get("/", (req, res) => {
  res.json({ msg: "GET all tasks" });
});

//GET a single task
router.get("/:id", (req, res) => {
  res.json({ msg: "Got a single workout" });
});

//POST a task
router.post("/", async (req, res) => {
  const { task, days, date } = req.body;

  try {
    const taskDocument = await Task.create({ task, days, date });
    res.status(200).json(taskDocument);
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
});

//DELETE a task
router.delete("/:id", (req, res) => {
  res.json({ msg: "Deleted a workout" });
});

//UPDATE a task
router.patch("/:id", (req, res) => {
  res.json({ msg: "Updated a workout" });
});

module.exports = router;
