import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { registerSocketServer } from "./src/socketServer.js";
import "./src/ai.js";

dotenv.config();

const app = express();

const server = http.createServer(app);
registerSocketServer(server);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT | 3000;

server.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
