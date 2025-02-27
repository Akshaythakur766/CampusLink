import express from "express";
import cookieParser from "cookie-parser";
import router from "./router/auth";
import { MongoConnect } from "./config/db";
import { config } from "./config/env";

const app = express();
// Database Connection
MongoConnect(config.mongoURI);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/", router);
app.listen(config.port, () => {
  console.log(`Server started at ${config.port}`);
});
