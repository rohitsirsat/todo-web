import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

// routes import
// import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";

// routes declaration
app.use("/api/v1/todos", todoRouter);
// https://localhost:8000/api/v1/todos

export { app };
