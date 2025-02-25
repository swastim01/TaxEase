import React, { useState } from "react";

const TaxCalculator = () => {
  const [netIncome, setNetIncome] = useState("");
  const [tax, setTax] = useState({
    incomeTax: "",
    surcharge: "",
    educationCess: "",
    secondaryCess: "",
    totalTax: ""
  });

  const calculateTax = () => {
    let income = parseFloat(netIncome);
    if (isNaN(income) || income <= 0) {
      setTax({ incomeTax: "", surcharge: "", educationCess: "", secondaryCess: "", totalTax: "" });
      return;
    }

    let incomeTax = 0;
    let surcharge = 0;
    let educationCess = 0;
    let secondaryCess = 0;
    let totalTax = 0;

    // Basic Tax Slab (For simplicity, assuming individual < 60 years under old regime)
    if (income <= 250000) {
      incomeTax = 0;
    } else if (income <= 500000) {
      incomeTax = (income - 250000) * 0.05;
    } else if (income <= 1000000) {
      incomeTax = 12500 + (income - 500000) * 0.2;
    } else {
      incomeTax = 112500 + (income - 1000000) * 0.3;
    }

    // Surcharge (applicable for income above 50L, 1Cr, etc.)
    if (income > 5000000 && income <= 10000000) {
      surcharge = incomeTax * 0.1;
    } else if (income > 10000000) {
      surcharge = incomeTax * 0.15;
    }

    // Cess calculations
    educationCess = (incomeTax + surcharge) * 0.02;
    secondaryCess = (incomeTax + surcharge) * 0.01;

    // Total Tax Calculation
    totalTax = incomeTax + surcharge + educationCess + secondaryCess;

    setTax({ incomeTax, surcharge, educationCess, secondaryCess, totalTax });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Tax Calculator</h2>
      <p className="text-muted text-center">As amended up to Finance (No.2) Act 2024</p>
      
      <form>

             
        {/* Assessment Year */}
        <div className="mb-3">
            <label className="form-label">Assessment Year</label>
            <select className="form-select">
              <option>2025-2026</option>
              <option>2024-2025</option>
            </select>
          </div>
  
          {/* Tax Payer Type */}
          <div className="mb-3">
            <label className="form-label">Tax Payer</label>
            <select className="form-select">
              <option>Individual</option>
              <option>HUF</option>
              <option>AOPs/BOI</option>
              <option>Domestic Company</option>
              <option>Foreign</option>
            </select>
          </div>
  
          {/* Age Category */}
          <div className="mb-3">
            <label className="form-label">Category (Age)</label>
            <select className="form-select">
              <option>Less than 60 years</option>
              <option>Equal to 60 years or more but less than 80 years</option>
              <option>Equal to 80 years or more</option>
            </select>
          </div>
  
          {/* Residential Status */}
          <div className="mb-3">
            <label className="form-label">Residential Status</label>
            <select className="form-select">
              <option>Resident</option>
              <option>Not Resident</option>
            </select>
          </div>

      

        <div className="mb-3">
          <label className="form-label">Net Taxable Income</label>
          <input 
            type="number" 
            className="form-control" 
            value={netIncome} 
            onChange={(e) => setNetIncome(e.target.value)}
            onBlur={calculateTax}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Income Tax after relief u/s 87A</label>
          <input type="text" className="form-control bg-light" value={tax.incomeTax} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Surcharge</label>
          <input type="text" className="form-control bg-light" value={tax.surcharge} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Education Cess</label>
          <input type="text" className="form-control bg-light" value={tax.educationCess} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Secondary and Higher Education Cess</label>
          <input type="text" className="form-control bg-light" value={tax.secondaryCess} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Tax Liability</label>
          <input type="text" className="form-control bg-light" value={tax.totalTax} disabled />
        </div>
        
        <button type="reset" className="btn btn-danger" onClick={() => setNetIncome("")}>Reset</button>
      </form>
      
      <p className="text-muted mt-4">
        <strong>Disclaimer:</strong> The above calculator provides a basic estimate of tax liability. Users are advised to refer to official tax provisions before filing returns.
      </p>
    </div>
  );
};

export default TaxCalculator;



