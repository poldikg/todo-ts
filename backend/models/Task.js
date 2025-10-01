const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskModel = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    days: {
      type: [String],
      required: [true, "Expected an array of strings."],
      validate: {
        validator: (v) => {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Days array must contain at least one item.",
      },
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskModel);
