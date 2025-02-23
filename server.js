require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
const authenticateUser = require("./firebaseAuth");
const Tesseract = require("tesseract.js");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Firebase Initialization
if (!process.env.FIREBASE_CREDENTIALS) {
  console.error("❌ FIREBASE_CREDENTIALS not found in .env file");
  process.exit(1);
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

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API Test Route
app.get("/", (req, res) => {
  res.send("AI Tax Assistant Backend Running ✅");
});

// User Login Route
app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await admin.auth().getUserByEmail(email);
    res.json({ uid: user.uid, email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Protected Route Example
app.get("/user-info", authenticateUser, (req, res) => {
  res.json({ message: "Protected Route Accessed ✅", user: req.user });
});

// OCR Upload Endpoint
const upload = multer({ dest: "uploads/" });
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  try {
    const { data: { text } } = await Tesseract.recognize(req.file.path, "eng");
    res.json({ extractedText: text });
  } catch (error) {
    res.status(500).json({ error: "OCR Processing Failed" });
  }
});

// Tax Calculation & Deduction Suggestions Endpoint
app.post("/calculate-tax", authenticateUser, async (req, res) => {
  const { extractedText, income } = req.body;

  if (!extractedText || !income) {
    return res.status(400).json({ error: "Missing OCR text or income data." });
  }

  try {
    // Rule-based Tax Deduction Logic
    let deductions = [];
    if (extractedText.toLowerCase().includes("charitable donation")) {
      deductions.push("Charitable Donation Deduction");
    }
    if (extractedText.toLowerCase().includes("mortgage interest")) {
      deductions.push("Mortgage Interest Deduction");
    }
    // Additional rules can be added here

    // AI-powered Deduction Suggestions
    const aiPrompt = `Given the following extracted tax document content: "${extractedText}" and an annual income of ${income}, list potential additional tax deductions and compliance considerations.`;
    const aiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: aiPrompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    const aiSuggestions = aiResponse.data.choices[0].text.trim();

    res.json({
      ruleBasedDeductions: deductions,
      aiSuggestions: aiSuggestions,
    });
  } catch (error) {
    console.error("Error in tax calculation:", error);
    res.status(500).json({ error: "Tax calculation processing failed." });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
