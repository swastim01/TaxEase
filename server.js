require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Endpoint Test
app.get("/", (req, res) => {
  res.send("AI Tax Assistant Backend Running ✅");
});

// Firebase Initialization
if (!process.env.FIREBASE_CREDENTIALS) {
  console.error("❌ FIREBASE_CREDENTIALS not found in .env file");
  process.exit(1); // Stop the server if missing
}

try {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_CREDENTIALS);
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
  console.log("✅ Firebase initialized successfully!");
} catch (error) {
  console.error("❌ Error parsing FIREBASE_CREDENTIALS:", error.message);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
