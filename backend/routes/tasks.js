const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

//GET all tasks
router.get("/", getAllTasks);

//GET a single task
router.get("/:id", getTask);

//POST a task
router.post("/", createTask);

//DELETE a task
router.delete("/:id", deleteTask);

//UPDATE a task
router.patch("/:id", updateTask);

module.exports = router;
