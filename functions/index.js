const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { fromPath } = require("pdf2pic");
const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Use multer to handle file uploads and store them temporarily in the "uploads" folder.
const upload = multer({ dest: "uploads/" });

// ✅ Convert PDF to Image
const convertPDFToImage = async (pdfPath) => {
  return new Promise((resolve, reject) => {
    const options = {
      density: 200,
      saveFilename: path.basename(pdfPath, ".pdf"),
      savePath: "uploads",
      format: "jpg",
      width: 800,
      height: 1000,
    };
    const converter = fromPath(pdfPath, options);
    converter(1)
      .then((result) => {
        console.log("✅ PDF converted to image:", result.path);
        resolve(result.path);
      })
      .catch((error) => {
        console.error("❌ PDF to Image conversion error:", error);
        reject(null);
      });
  });
};

// ✅ Extract text from image using Tesseract OCR
const extractTextFromImage = async (imagePath) => {
  const { data: { text } } = await Tesseract.recognize(imagePath, "eng");
  return text;
};

// ✅ Normalize OCR text
const normalizeText = (text) => text.replace(/\s+/g, " ").trim();

// ✅ Extract salary slip details
const extractSalarySlipDetails = (text) => {
  return {
    employeeName: text.match(/Employee Name[:\s]+([\w\s]+)/i)?.[1] || "Not found",
    employeeNo: text.match(/Employee\s*No[:\s]+([\w\d]+)/i)?.[1] || "Not found",
    designation: text.match(/Designation[:\s]+([\w\s]+)/i)?.[1] || "Not found",
    dateOfJoining: text.match(/Date of Joining[:\s]+([\d\/-]+)/i)?.[1] || "Not found",
    basicSalary: text.match(/Basic Salary[:\s]+₹?([\d,\.]+)/i)?.[1] || "Not found",
    hra: text.match(/HRA[:\s]+₹?([\d,\.]+)/i)?.[1] || "Not found",
    allowances: text.match(/Allowances[:\s]+₹?([\d,\.]+)/i)?.[1] || "Not found",
    grossSalary: text.match(/Gross Salary[:\s]+₹?([\d,\.]+)/i)?.[1] || "Not found",
    deductions: text.match(/Deductions[:\s]+₹?([\d,\.]+)/i)?.[1] || "0",
    netPay: text.match(/Net Pay[:\s]+₹?([\d,\.]+)/i)?.[1] || "Not found",
  };
};

// ✅ Calculate tax based on Indian tax slabs
const calculateTaxBreakdown = (details) => {
  const grossStr = details.grossSalary;
  if (!grossStr || grossStr === "Not found") return null;

  const gross = parseFloat(grossStr.replace(/,/g, "")) || 0;
  const deductions = parseFloat(details.deductions.replace(/,/g, "")) || 0;
  const standardDeduction = 50000;
  const taxableIncome = Math.max(0, gross - deductions - standardDeduction);
  let taxBeforeCess = 0;
  let breakdown = [];

  if (taxableIncome <= 250000) {
    taxBeforeCess = 0;
    breakdown.push({ slab: "Up to ₹2.5 Lakh", tax: "₹0" });
  } else if (taxableIncome <= 500000) {
    const slabTax = (taxableIncome - 250000) * 0.05;
    taxBeforeCess = slabTax;
    breakdown.push({ slab: "Up to ₹2.5 Lakh", tax: "₹0" });
    breakdown.push({ slab: "₹2.5 Lakh - ₹5 Lakh (5%)", tax: `₹${slabTax.toFixed(2)}` });
  } else if (taxableIncome <= 1000000) {
    taxBeforeCess = (250000 * 0.05) + (taxableIncome - 500000) * 0.20;
    breakdown.push({ slab: "Up to ₹2.5 Lakh", tax: "₹0" });
    breakdown.push({ slab: "₹2.5 Lakh - ₹5 Lakh (5%)", tax: "₹12500" });
    breakdown.push({ slab: "₹5 Lakh - ₹10 Lakh (20%)", tax: `₹${((taxableIncome - 500000) * 0.2).toFixed(2)}` });
  } else {
    taxBeforeCess = (250000 * 0.05) + (500000 * 0.20) + (taxableIncome - 1000000) * 0.30;
    breakdown.push({ slab: "Up to ₹2.5 Lakh", tax: "₹0" });
    breakdown.push({ slab: "₹2.5 Lakh - ₹5 Lakh (5%)", tax: "₹12500" });
    breakdown.push({ slab: "₹5 Lakh - ₹10 Lakh (20%)", tax: "₹100000" });
    breakdown.push({ slab: "₹10 Lakh+ (30%)", tax: `₹${((taxableIncome - 1000000) * 0.3).toFixed(2)}` });
  }

  const cess = taxBeforeCess * 0.04;
  const totalTaxLiability = taxBeforeCess + cess;

  return {
    grossSalary: gross.toFixed(2),
    standardDeduction: standardDeduction.toFixed(2),
    deductions: deductions.toFixed(2),
    taxableIncome: taxableIncome.toFixed(2),
    taxBeforeCess: taxBeforeCess.toFixed(2),
    cess: cess.toFixed(2),
    totalTaxLiability: totalTaxLiability.toFixed(2),
    breakdown,
  };
};

// ✅ API Route for Uploading & Processing Salary Slip
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });

  try {
    console.log("✅ File received:", req.file.path);
    let filePath = req.file.path;
    const originalExt = path.extname(req.file.originalname).toLowerCase();

    if (originalExt === ".pdf") {
      console.log("📄 PDF detected! Converting to image...");
      filePath = await convertPDFToImage(req.file.path);
      if (!filePath) return res.status(500).json({ error: "Failed to convert PDF to image." });
    }

    let rawText = await extractTextFromImage(filePath);
    console.log("📄 Extracted Text:", rawText);

    const normalizedText = normalizeText(rawText);
    console.log("📄 Normalized Text:", normalizedText);

    const salaryDetails = extractSalarySlipDetails(normalizedText);
    const taxBreakdown = calculateTaxBreakdown(salaryDetails);
    const extractedData = { ...salaryDetails, taxBreakdown };

    console.log("📊 Structured Data:", extractedData);

    // Remove the uploaded files after processing
    fs.unlinkSync(req.file.path);
    if (originalExt === ".pdf" && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ extractedData });
  } catch (error) {
    console.error("❌ OCR Processing Error:", error);
    res.status(500).json({ error: "Failed to process salary slip." });
  }
});

// Health-check endpoint
app.get("/", (req, res) => {
  res.send("✅ TaxEase OCR Backend is Running!");
});

// Export the Express app as a Firebase Cloud Function named "api"
exports.api = functions.https.onRequest(app);
