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
  const [expensiveDrugCost, setExpensiveDrugCost] = useState<number>(0);
  const [expensiveAlternativeDrugCost, setExpensiveAlternativeDrugCost] = useState<number>(0);

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
                onChange={(e) => setExpensiveDrugCost(Number(e.target.value))}
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
                value={expensiveAlternativeDrugCost}
                onChange={(e) => setExpensiveAlternativeDrugCost(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                placeholder="Enter cost"
              />
            </div>

             <div>
                <label className="block text-sm font-medium mb-2">Cost basis</label>
                <select 
                  value={costBasis} 
                  onChange={(e) => setCostBasis(e.target.value)}
                  className="w-52 p-2 border rounded-md"
                >
                  <option value="per-year">per year</option>
                  <option value="per-month">per month</option>
                </select>
              </div>
          </div>

          {/* Population */}

          {/* <h2 className="text-2xl font-bold mb-4">Pick your medicine</h2> */}

          <div>Members in health plan taking speciality drug per annum</div>
              <input
                type="number"
                value={expensiveDrugCost}
                onChange={(e) => setExpensiveDrugCost(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                placeholder="Enter cost"
              />

          <h2>Enrolment rate in study from members in health plan 0-100%</h2> Number percentage.
          <div>IVP Trial</div>

          <h1>Trial Pricing Enrolment</h1>
          <h2>Enrolment Rate</h2>          
          <h2>Per-enrollee price to payer (as % of expensive drug cost): slider 70–95%  </h2>

          <h1>Outcomes and Adoption</h1>
          <h2>Post-trial adoption</h2>
          <h2>Probability of trial success</h2>

          <h1>Timing and finance</h1>
          <h2>Trial duration</h2>
          <h2>Post-trial horizon</h2>
          <h2>Discount rate for NPV</h2>
          <h2>Optional program fee to payer</h2>


          {/* <ComboboxDemo
            options={frameworks}
            value={selectedFramework}
            onValueChange={setSelectedFramework}
            placeholder="Select framework..."
            searchPlaceholder="Search framework..."
            emptyText="No framework found."
          /> */}

          {/* center the button  */}
          <Button className="mt-4">
            Submit
          </Button>

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
