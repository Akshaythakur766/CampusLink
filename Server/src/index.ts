import express from "express";
import cookieParser from "cookie-parser";
import {router} from "@CampusLink/Server/Router"
import { MongoConnect } from "./config/Database/db";
import { config } from "./config/Env/env";

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
