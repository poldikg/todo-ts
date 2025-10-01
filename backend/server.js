require("dotenv").config();

const router = require("./routes/tasks");
const mongoose = require("mongoose");

const express = require("express");
//express app
const app = express();

//middleware

//checks if there is a body when a request is made
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/tasks", router);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
