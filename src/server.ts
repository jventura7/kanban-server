import express from "express";
import morgan from "morgan";
import cors from "cors";
import { api, auth } from "./routes";
import { protect } from "./util/auth";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.use("/api", protect, api);
app.use("/auth", auth);
export default app;
