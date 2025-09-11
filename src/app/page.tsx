"use client";

import { useState, useRef } from "react";

const currencies = [
  { value: "$", label: "USD ($)" },
];

export default function Home() {
  const resultsColumnRef = useRef<HTMLDivElement>(null);
  
  const downloadResults = async () => {
    if (resultsColumnRef.current) {
      try {
        // Dynamic import to avoid SSR issues
        const html2pdf = (await import('html2pdf.js')).default;
        
        // Create a clone of the element to avoid modifying the original
        const element = resultsColumnRef.current.cloneNode(true) as HTMLElement;
        
        // Add CSS overrides to handle unsupported color functions
        const style = document.createElement('style');
        style.textContent = `
          * {
            color: rgb(0, 0, 0) !important;
            background-color: rgb(255, 255, 255) !important;
            border-color: rgb(229, 231, 235) !important;
          }
          .bg-gray-50 {
            background-color: rgb(249, 250, 251) !important;
          }
          .text-gray-600 {
            color: rgb(75, 85, 99) !important;
          }
          .bg-blue-600 {
            background-color: rgb(37, 99, 235) !important;
          }
          .text-white {
            color: rgb(255, 255, 255) !important;
          }
          .border {
            border-color: rgb(229, 231, 235) !important;
          }
        `;
        element.appendChild(style);
        
        const options = {
          margin: 0.5,
          filename: 'pharma-calculator-results.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff'
          },
          jsPDF: { 
            unit: 'in', 
            format: 'letter', 
            orientation: 'portrait' 
          }
        };
        
        // Export the cloned element with CSS overrides
        html2pdf().set(options).from(element).save();
        
      } catch (error) {
        console.error('PDF generation failed:', error);
      }
    }
  };

  const [currency, setCurrency] = useState<string>("$");
  const [costBasis, setCostBasis] = useState<string>("per-year");
  const [specialtyCostBasis, setSpecialtyCostBasis] = useState<string>("per-year");
  const [expensiveDrugCost, setExpensiveDrugCost] = useState<number | ''>('');
  const [alternativeDrugCost, setAlternativeDrugCost] = useState<number | ''>('');
  const [alternativeCostBasis, setAlternativeCostBasis] = useState<string>("per-year");
  const [membersInHealthPlan, setMembersInHealthPlan] = useState<number | ''>('');
  const [enrollmentRate, setEnrollmentRate] = useState<number | ''>('');
  const [trialEnrollmentRate, setTrialEnrollmentRate] = useState<number | ''>('');
  const [perEnrolleePriceToPayer, setPerEnrolleePriceToPayer] = useState<number | ''>('');
  const [postTrialAdoption, setPostTrialAdoption] = useState<number | ''>('');
  const [probabilityOfTrialSuccess, setProbabilityOfTrialSuccess] = useState<number | ''>('');
  const [trialDuration, setTrialDuration] = useState<number | ''>('');
  const [postTrialHorizon, setPostTrialHorizon] = useState<number | ''>('');
  const [discountRateForNPV, setDiscountRateForNPV] = useState<number | ''>('');
  const [optionalProgramFeeToPayer, setOptionalProgramFeeToPayer] = useState<number | ''>('');
  const [inStudyTotalSavings, setInStudyTotalSavings] = useState<number | ''>('');
  const [inStudyPerEnrolleeSavings, setInStudyPerEnrolleeSavings] = useState<number | ''>('');
  const [expectedPostTrialSavings, setExpectedPostTrialSavings] = useState<number | ''>('');
  const [totalSavings, setTotalSavings] = useState<number | ''>('');
  const [savingsMultiple, setSavingsMultiple] = useState<number | ''>('');
  const [roi, setRoi] = useState<number | ''>('');

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-8 gap-8 sm:p-8">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div className="flex gap-8 w-full max-w-7xl">
          <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Public Good Pharma Calculator</h1>
          
          {/* Currency Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Currency and time basis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select  
                 disabled={true}
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-32 p-2 border rounded-md"
                >
                  {currencies.map((curr) => (
                    <option key={curr.value} value={curr.value}>
                      {curr.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cost basis</label>
                <select 
                  value={costBasis} 
                  onChange={(e) => setCostBasis(e.target.value)}
                  className="w-52 p-2 border rounded-md"
                >
                  <option value="per-year">Per patient per year</option>
                  <option value="per-month">Per patient per month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drug Costs */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Drug Costs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Specialty drug cost
                </label>
                <input
                  type="number"
                  value={expensiveDrugCost}
                  onChange={(e) => setExpensiveDrugCost(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter cost"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cost basis</label>
                <select 
                  value={specialtyCostBasis} 
                  onChange={(e) => setSpecialtyCostBasis(e.target.value)}
                  className="w-full p-2 border rounded-md">
                  <option value="per-year">per year</option>
                  <option value="per-month">per month</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Alternative drug
                </label>
                <input
                  type="number"
                  value={alternativeDrugCost}
                  onChange={(e) => setAlternativeDrugCost(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter cost"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cost basis</label>
                <select 
                  value={alternativeCostBasis} 
                  onChange={(e) => setAlternativeCostBasis(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="per-year">per year</option>
                  <option value="per-month">per month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Population */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Population</h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Members in health plan taking specialty drug per annum
            </label>
            <input
              type="number"
              value={membersInHealthPlan}
              onChange={(e) => setMembersInHealthPlan(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter number of members"
            />
          </div>
          </div>

          {/* Trial pricing and enrolment */}
          <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Trial pricing and enrolment</h2>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Per-enrollee price to payer (as % of expensive drug cost) (70-95%)
            </label>
            <input
              type="number"
              min="70"
              max="95"
              value={perEnrolleePriceToPayer}
              onChange={(e) => setPerEnrolleePriceToPayer(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter percentage (70-95)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Enrollment Rate (0-100%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={trialEnrollmentRate}
              onChange={(e) => setTrialEnrollmentRate(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter percentage (0-100)"
            />
          </div>          

          <div className="mb-6 mt-8">
          <h2 className="text-lg font-semibold mb-3">Outcomes and Adoption</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Post-trial adoption (0-100%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={postTrialAdoption}
              onChange={(e) => setPostTrialAdoption(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter percentage (0-100)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Probability of trial success (0-100%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={probabilityOfTrialSuccess}
              onChange={(e) => setProbabilityOfTrialSuccess(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter percentage (0-100)"
            />
          </div>

          <div className="mb-6 mt-8">
          <h2 className="text-lg font-semibold mb-3">Timing and finance</h2>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Trial duration (months)
            </label>
            <input
              type="number"
              min="1"
              value={trialDuration}
              onChange={(e) => setTrialDuration(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter duration in months"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Post-trial horizon (months)
            </label>
            <input
              type="number"
              min="1"
              value={postTrialHorizon}
              onChange={(e) => setPostTrialHorizon(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter horizon in months"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Discount rate for NPV (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={discountRateForNPV}
              onChange={(e) => setDiscountRateForNPV(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter discount rate percentage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Optional program fee to payer
            </label>
            <input
              type="number"
              min="0"
              value={optionalProgramFeeToPayer}
              onChange={(e) => setOptionalProgramFeeToPayer(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter program fee amount"
            />
          </div>

          </div>

          {/* Results Column */}
          <div  className="w-full max-w-md bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Results</h2>
              <button 
                onClick={downloadResults}
                className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
              >
                Export Results
              </button>
            </div>
            <div ref={resultsColumnRef} className="space-y-4">
              <div className="p-3 bg-white rounded border">
                <p className="text-sm text-gray-600"></p>

              <div className="mb-4">
                <h3 className="font-semibold text-base mb-3">In-Study Savings</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Savings:</span>
                    <span className="text-sm font-medium">${inStudyTotalSavings || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Per Enrollee:</span>
                    <span className="text-sm font-medium">${inStudyPerEnrolleeSavings || '0'}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-base mb-3">Expected Post-Trial Savings</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Success-weighted over horizon:</span>
                    <span className="text-sm font-medium">${expectedPostTrialSavings || '0'}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-base mb-3">Total Savings</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">In-study + Post-trial:</span>
                    <span className="text-sm font-medium">${totalSavings || '0'}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-base mb-3">Savings Multiple / ROI</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Savings Multiple:</span>
                    <span className="text-sm font-medium">{savingsMultiple || '0'}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ROI:</span>
                    <span className="text-sm font-medium">{roi || '0'}%</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-base mb-3">Key Drivers</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Enrollment:</span>
                    <span className="text-sm font-medium">{enrollmentRate || '0'}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Price during study:</span>
                    <span className="text-sm font-medium">{perEnrolleePriceToPayer || '0'}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Adoption:</span>
                    <span className="text-sm font-medium">{postTrialAdoption || '0'}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Success:</span>
                    <span className="text-sm font-medium">{probabilityOfTrialSuccess || '0'}%</span>
                  </div>
                </div>
              </div>

 
              </div>

            </div>
          </div>

        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Public Good Pharma
      </footer>
    </div>
  );
}
