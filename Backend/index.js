import express from "express";
import { PORT, MongoURL } from "./Config.js";
import mongoose from "mongoose";

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

const app = express();

app.get("/", (req, res) => {
  const response = "Hello World!!";
  res.send(response);

});
