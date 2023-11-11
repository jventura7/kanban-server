import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import { api, auth } from "./routes";
import { protect } from "./util/auth";

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: oneDay,
      sameSite: "lax",
    },
  })
);

// Routes
app.get("/", (req, res) => {
  res.cookie("hello", "world");
  res.json({ message: "Hello from server" });
});

app.use("/api", protect, api);
app.use("/auth", auth);
export default app;
