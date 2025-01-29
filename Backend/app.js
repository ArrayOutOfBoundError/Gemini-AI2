import express from "express";
import requestRouter from "./requestRouter.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["POST","GET","OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v3/prompt", requestRouter);
export { app };
