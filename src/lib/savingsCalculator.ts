export interface SavingsCalculationParams {
  expensiveDrugCost: number;
  alternativeDrugCost: number;
  specialtyCostBasis: string;
  alternativeCostBasis: string;
  membersInHealthPlan: number;
  trialEnrollmentRate: number;
  perEnrolleePriceToPayer: number;
  trialDuration: number;
  postTrialHorizon?: number;
  postTrialAdoption?: number;
  probabilityOfTrialSuccess?: number;
  discountRateForNPV?: number;
  optionalProgramFeeToPayer?: number;
}

export interface SavingsCalculationResult {
  inStudyTotalSavings: number;
  inStudyPerEnrolleeSavings: number;
  expectedPostTrialSavings: number;
  totalSavings: number;
  roi: number;
  savingsMultiple: number;
}

export function calculateSavings(params: SavingsCalculationParams): SavingsCalculationResult | null {
  const {
    expensiveDrugCost,
    alternativeDrugCost,
    specialtyCostBasis,
    alternativeCostBasis,
    membersInHealthPlan,
    trialEnrollmentRate,
    perEnrolleePriceToPayer,
    trialDuration,
    postTrialHorizon,
    postTrialAdoption,
    probabilityOfTrialSuccess,
    discountRateForNPV,
    optionalProgramFeeToPayer
  } = params;

  // Only calculate if we have the minimum required values
  if (
    !expensiveDrugCost || 
    !alternativeDrugCost || 
    !membersInHealthPlan || 
    !trialEnrollmentRate || 
    !perEnrolleePriceToPayer || 
    !trialDuration
  ) {
    return null;
  }

  // Convert costs to annual basis for calculations
  const annualExpensiveCost = specialtyCostBasis === 'per-month' ? expensiveDrugCost * 12 : expensiveDrugCost;
  const annualAlternativeCost = alternativeCostBasis === 'per-month' ? alternativeDrugCost * 12 : alternativeDrugCost;
  
  // Calculate number of enrollees
  const enrollees = (membersInHealthPlan * trialEnrollmentRate) / 100;
  
  // Calculate in-study savings
  const costDifference = annualExpensiveCost - annualAlternativeCost;
  const trialDurationYears = trialDuration / 12;
  const inStudyTotal = enrollees * costDifference * trialDurationYears;
  const inStudyPerEnrollee = costDifference * trialDurationYears;
  
  // Calculate post-trial savings (if applicable)
  let postTrialSavings = 0;
  if (postTrialHorizon && postTrialAdoption && probabilityOfTrialSuccess) {
    const postTrialYears = postTrialHorizon / 12;
    const adoptionRate = postTrialAdoption / 100;
    const successProbability = probabilityOfTrialSuccess / 100;
    
    // Apply discount rate if provided
    let discountFactor = 1;
    if (discountRateForNPV) {
      const discountRate = discountRateForNPV / 100;
      discountFactor = 1 / Math.pow(1 + discountRate, postTrialYears);
    }
    
    postTrialSavings = enrollees * costDifference * postTrialYears * adoptionRate * successProbability * discountFactor;
  }
  
  // Calculate total savings
  const totalSav = inStudyTotal + postTrialSavings;
  
  // Calculate investment (program fee if any)
  const investment = optionalProgramFeeToPayer || 0;
  
  // Calculate ROI and savings multiple
  const roiValue = investment > 0 ? ((totalSav - investment) / investment) * 100 : 0;
  const savingsMultipleValue = investment > 0 ? totalSav / investment : 0;
  
  return {
    inStudyTotalSavings: Math.round(inStudyTotal),
    inStudyPerEnrolleeSavings: Math.round(inStudyPerEnrollee),
    expectedPostTrialSavings: Math.round(postTrialSavings),
    totalSavings: Math.round(totalSav),
    roi: Math.round(roiValue * 100) / 100, // Round to 2 decimal places
    savingsMultiple: Math.round(savingsMultipleValue * 100) / 100, // Round to 2 decimal places
  };
}