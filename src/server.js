import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

export default app;
