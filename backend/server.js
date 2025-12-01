const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const store = {}; // { pin: { type, content, createdAt, expiresAt, consumed } }

function generatePin() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

setInterval(() => {
  const now = Date.now();
  for (const pin in store) {
    if (store[pin].expiresAt <= now) {
      delete store[pin];
    }
  }
}, 60 * 1000);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/create", (req, res) => {
  const { type, content, ttlSeconds } = req.body;
  if (!type || !content) {
    return res.status(400).json({ error: "type and content are required" });
  }
  if (!["text"].includes(type)) {
    return res.status(400).json({ error: "only text supported in demo" });
  }

  const ttl = ttlSeconds || 600;
  const pin = generatePin();
  const now = Date.now();

  store[pin] = {
    type,
    content,
    createdAt: now,
    expiresAt: now + ttl * 1000,
    consumed: false,
  };

  res.json({ pin, expiresIn: ttl });
});

app.post("/api/fetch", (req, res) => {
  const { pin } = req.body;
  if (!pin) {
    return res.status(400).json({ error: "pin is required" });
  }

  const entry = store[pin];
  const now = Date.now();

  if (!entry || entry.expiresAt <= now) {
    delete store[pin];
    return res.status(404).json({ error: "PIN expired or not found" });
  }

  if (entry.consumed) {
    return res.status(410).json({ error: "Data already consumed" });
  }

  entry.consumed = true;
  const { type, content } = entry;
  delete store[pin];

  res.json({ type, content });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`MicroSync backend running on http://localhost:${PORT}`);
});
