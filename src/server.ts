import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/auth", authRouter);
export default app;
