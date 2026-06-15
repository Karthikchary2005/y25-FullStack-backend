import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import taskRouter
from "./controllers/taskcontroller.js";

import {
  connectDB
}
from "./config/db.js";

dotenv.config();

const app =
express();

app.use(
  cors()
);

app.use(
  express.json()
);

await connectDB();

app.use(
  "/task",
  taskRouter
);

app.get(
  "/",

  (
    req,
    res
  ) => {

    res.json({

      success: true,

      message:
      "Task Service Running"

    });

  }

);

const PORT =
process.env.PORT || 8002;

app.listen(

  PORT,

  () => {

    console.log(

      `🚀 Server Running on Port ${PORT}`

    );

  }

);
