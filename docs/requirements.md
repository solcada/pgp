1. **Currency and time basis**
   - Currency: $
   - Cost basis: per patient per year or per month

2. **Drug costs**
   - Expensive drug cost (per pt/yr or pm): number  
   - Lower-cost option (per pt/yr or pm): number  
     - *“Enter lower-cost price”*  
     - If dose reduction is used, compute lower-cost = expensive × (1 − dose%)

3. **Population**
   - Patients currently on expensive drug: integer

4. **Trial pricing and enrollment**
   - Per-enrollee price to payer (as % of expensive drug cost): slider 70–95%  
     - *Helper text*: “Payer pays this % during the study for enrolled members. Payer saves the remainder.”  
     - *Inline calc*: show “Payer saving per enrollee during study = (100 − %)% of current drug cost.”  
   - Enrollment rate (share of current patients who enroll): slider 1–10%

5. **Outcomes and adoption**
   - Probability of trial success: slider 70–99%  
   - Post-trial adoption (share of all current patients moved to lower-cost option if success): slider 40–90%

6. **Timing and finance (advanced, collapsible)**
   - Trial duration: months slider 6–12 (default 10)  
   - Post-trial horizon: years slider 1–5 (default 3)  
   - Discount rate for NPV: 0–10% (default 3%)  
   - Optional program fee to payer (one-time): number (default 0)
