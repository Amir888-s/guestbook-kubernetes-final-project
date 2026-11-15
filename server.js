const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const messages = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", version: "v2" });
});

app.get("/api/messages", (_req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const text = String(req.body.text || "").trim();

  if (!text) {
    return res.status(400).json({ error: "Message is required" });
  }

  const message = {
    id: Date.now().toString(),
    text: text.slice(0, 280),
    createdAt: new Date().toISOString()
  };

  messages.unshift(message);
  return res.status(201).json(message);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Guestbook v2 listening on port ${port}`);
});
