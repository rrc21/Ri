import { userRoutes } from "./routes/router";
import express = require("express");
import { createServer } from "http";
import connects from "./database";

const MongoClient = require("mongodb").MongoClient;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const url = "mongodb://localhost:27017/mydb";
console.log("in app");
const httpServer = createServer(app);
app.use(userRoutes);

const Port = process.env.PORT || 3002;
connects();

httpServer.listen(Port, () => {
  console.log("App is listening on port ", Port);
});

MongoClient.connect(url, function (err: any, db: any) {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
  console.log("Connected to MongoDB successfully!");
  db.close();
});
