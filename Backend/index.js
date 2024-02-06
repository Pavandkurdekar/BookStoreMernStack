import express from "express";
import { PORT, MongoURL } from "./Config.js";
import mongoose from "mongoose";
import BookRoute from "./Routes/BookRoute.js"

const app = express()
app.use(express.json());

mongoose
  .connect(MongoURL)
  .then(() => {
    console.log("Connected To Mongo Successfully!!!");
    app.listen(PORT, () => {
      console.log(`App Is Listening At Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", BookRoute)

