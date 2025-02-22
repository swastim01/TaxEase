require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Endpoint Test
app.get("/", (req, res) => {
  res.send("AI Tax Assistant Backend Running ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
