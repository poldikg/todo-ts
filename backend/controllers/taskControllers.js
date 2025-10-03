const Task = require("../models/Task");
const mongoose = require("mongoose");

//GET all tasks
const getAllTasks = async (req, res) => {
  const allTasks = await Task.find({}).sort({ createdAt: -1 });

  res.status(200).json(allTasks);
};

//GET a task
const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This task doesn't exist" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: "This task doesn't exist" });
  }

  res.status(200).json(task);
};

//POST a task
const createTask = async (req, res) => {
  const { task, days, date } = req.body;

  try {
    const taskDocument = await Task.create({ task, days, date });
    res.status(200).json(taskDocument);
  } catch (error) {
    res.status(400).json({ errMsg: error.message });
  }
};

//UPDATE a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { date, task, days } = req.body;
  console.log({ date, task, days });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "This task doesn't exist. ID is invalid." });
  }

  const updateTask = await Task.findByIdAndUpdate(id, { date, task, days });

  if (!updateTask) {
    return res
      .status(404)
      .json({ error: "This task doesn't exist. ID is invalid." });
  }

  res.status(200).json(updateTask);
};

//DELETE a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "This task doesn't exist. ID is invalid" });
  }

  const removedTask = await Task.findByIdAndDelete(id);

  if (!removedTask) {
    return res
      .status(404)
      .json({ error: "This task doesn't exist. ID is invalid" });
  }

  res.status(200).json(removedTask);
};

module.exports = { createTask, getAllTasks, getTask, updateTask, deleteTask };
