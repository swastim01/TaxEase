import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  User,
  DollarSign,
  ClipboardCheck,
  ExternalLink,
  MessageCircle
} from "lucide-react";

// Using jsPDF from CDN (ensure the following script is added in public/index.html):
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
const { jsPDF } = window.jspdf;

export default function SalarySlipDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { extractedData = {} } = location.state || {};

  // Fallback values for salary details
  const grossSalary = extractedData.grossSalary || "Not found";
  const deductions = extractedData.deductions || "0";
  const netPay =
    extractedData.netPay ||
    (grossSalary !== "Not found" ? grossSalary - deductions : "Not found");

  const taxBreakdown = extractedData.taxBreakdown || {
    standardDeduction: "50,000",
    taxableIncome: "Not calculated",
    taxBeforeCess: "Not calculated",
    cess: "Not calculated",
    totalTaxLiability: "Not calculated",
    breakdown: [],
  };

  // Generate PDF for Salary Slip & Tax Invoice
  const downloadInvoice = () => {
    if (!jsPDF) {
      alert("PDF generation failed. Please check the CDN link in index.html.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Detailed Salary & Tax Invoice", 20, 20);
    doc.setFontSize(12);

    let yPos = 30;
    const addLine = (label, value) => {
      doc.text(`${label}: ${value}`, 20, yPos);
      yPos += 10;
    };

    addLine("Employee Name", extractedData.employeeName || "Not found");
    addLine("Employee No", extractedData.employeeNo || "Not found");
    addLine("Designation", extractedData.designation || "Not found");
    addLine("Date of Joining", extractedData.dateOfJoining || "Not found");
    addLine("Gross Salary", `₹${grossSalary}`);
    addLine("Deductions", `₹${deductions}`);
    addLine("Net Pay", `₹${netPay}`);

    if (taxBreakdown.totalTaxLiability !== "Not calculated") {
      doc.text("Tax Breakdown:", 20, yPos);
      yPos += 10;
      addLine("Standard Deduction", `₹${taxBreakdown.standardDeduction}`);
      addLine("Taxable Income", `₹${taxBreakdown.taxableIncome}`);
      addLine("Tax Before Cess", `₹${taxBreakdown.taxBeforeCess}`);
      addLine("Cess (4%)", `₹${taxBreakdown.cess}`);
      addLine("Total Tax Liability", `₹${taxBreakdown.totalTaxLiability}`);

      doc.text("Slab Breakdown:", 20, yPos);
      yPos += 10;
      taxBreakdown.breakdown.forEach((item) => {
        addLine(item.slab, `₹${item.tax}`);
      });
    } else {
      addLine("Tax Liability", "Not calculated due to missing salary data");
    }

    doc.save("Salary_Tax_Invoice.pdf");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary text-center mb-4">📜 Salary Slip & Tax Details</h2>
      
      <div className="card shadow-lg p-4 mb-4">
        <h4 className="text-secondary d-flex align-items-center mb-3">
          <User className="me-2" size={20} /> Employee Details
        </h4>
        <p>
          <strong>Employee Name:</strong> {extractedData.employeeName || "Not found"}
        </p>
        <p>
          <strong>Employee No:</strong> {extractedData.employeeNo || "Not found"}
        </p>
        <p>
          <strong>Designation:</strong> {extractedData.designation || "Not found"}
        </p>
        <p>
          <strong>Date of Joining:</strong> {extractedData.dateOfJoining || "Not found"}
        </p>

        <hr />

        <h4 className="text-secondary d-flex align-items-center mb-3">
          <DollarSign className="me-2" size={20} /> Salary Breakdown
        </h4>
        <p>
          <strong>Gross Salary:</strong> ₹{grossSalary}
        </p>
        <p>
          <strong>Deductions:</strong> ₹{deductions}
        </p>
        <p className="text-success">
          <strong>Net Pay:</strong> ₹{netPay}
        </p>

        <hr />

        {taxBreakdown.totalTaxLiability !== "Not calculated" ? (
          <div>
            <h4 className="text-secondary d-flex align-items-center mb-3">
              <ClipboardCheck className="me-2" size={20} /> Tax Breakdown
            </h4>
            <p>
              <strong>Standard Deduction:</strong> ₹{taxBreakdown.standardDeduction}
            </p>
            <p>
              <strong>Taxable Income:</strong> ₹{taxBreakdown.taxableIncome}
            </p>
            <p>
              <strong>Tax Before Cess:</strong> ₹{taxBreakdown.taxBeforeCess}
            </p>
            <p>
              <strong>Cess (4%):</strong> ₹{taxBreakdown.cess}
            </p>
            <h5 className="text-danger">
              <strong>Total Tax Liability:</strong> ₹{taxBreakdown.totalTaxLiability}
            </h5>

            <h5 className="text-secondary d-flex align-items-center mt-3 mb-2">
              <FileText className="me-2" size={20} /> Slab Breakdown
            </h5>
            <ul className="list-group">
              {taxBreakdown.breakdown.map((item, index) => (
                <li key={index} className="list-group-item">
                  {item.slab}: <strong>₹{item.tax}</strong>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h5 className="mt-3 text-danger">
            ⚠️ Tax details could not be calculated due to missing salary data.
          </h5>
        )}
      </div>

      <div className="text-center">
        <button className="btn btn-success me-3" onClick={downloadInvoice}>
          ⬇️ Download Detailed Tax Invoice
        </button>
        <button className="btn btn-secondary me-3" onClick={() => navigate("/upload")}>
          🔄 Upload Another Document
        </button>

        <div className="text-center">
          <button
            className="btn btn-info me-3 d-flex align-items-center gap-2"
            onClick={() => navigate("/chatbot")}
          >
            <MessageCircle size={20} /> Chat with AI for Missed Deductions
          </button>
        </div>

        <a
          href="/coming-soon"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary d-flex align-items-center gap-2 justify-content-center mt-3 mb-5"
        >
          <ExternalLink size={20} /> File Taxes on Govt Portal
        </a>
      </div>
    </div>
  );
}
