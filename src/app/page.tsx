"use client";

import { ComboboxDemo } from "@/components/ui/combobox"
import { Button } from "@/components/ui/button";
import { useState } from "react";

const currencies = [
  { value: "$", label: "USD ($)" },
];

export default function Home() {
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

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div className="w-full max-w-sm">
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
                  className="w-52 p-2 border rounded-md">
                  <option value="per-year">per year</option>
                  <option value="per-month">per month</option>
                </select>
              </div>
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
                  className="w-52 p-2 border rounded-md"
                >
                  <option value="per-year">per year</option>
                  <option value="per-month">per month</option>
                </select>
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

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Enrollment rate in study from members in health plan (0-100%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={enrollmentRate}
              onChange={(e) => setEnrollmentRate(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              placeholder="Enter percentage (0-100)"
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

          <div className="mb-6">
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

          <div className="mb-6">
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

          {/* <div className="mt-4 p-2 bg-gray-100 rounded">
            <p>Selected: {selectedFramework || "Nothing selected"}</p>
          </div> */}
  
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Public Good Pharma
      </footer>
    </div>
  );
}
