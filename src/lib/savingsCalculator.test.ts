import { calculateSavings, SavingsCalculationParams } from './savingsCalculator';

describe('SavingsCalculator', () => {
  const baseParams: SavingsCalculationParams = {
    expensiveDrugCost: 100000,
    alternativeDrugCost: 20000,
    specialtyCostBasis: 'per-year',
    alternativeCostBasis: 'per-year',
    membersInHealthPlan: 100,
    trialEnrollmentRate: 50,
    perEnrolleePriceToPayer: 80,
    trialDuration: 12,
  };

  describe('Basic calculations', () => {
    it('calculates in-study savings correctly', () => {
      const result = calculateSavings(baseParams);
      
      expect(result).not.toBeNull();
      expect(result!.inStudyTotalSavings).toBe(4000000); // 50 enrollees * 80,000 cost diff * 1 year
      expect(result!.inStudyPerEnrolleeSavings).toBe(80000); // 80,000 cost diff * 1 year
    });

    it('handles monthly cost basis conversion', () => {
      const monthlyParams = {
        ...baseParams,
        expensiveDrugCost: 8333, // ~100k per year
        alternativeDrugCost: 1667, // ~20k per year
        specialtyCostBasis: 'per-month' as const,
        alternativeCostBasis: 'per-month' as const,
      };

      const result = calculateSavings(monthlyParams);
      
      expect(result).not.toBeNull();
      // Should be similar to annual calculation (with rounding differences)
      expect(result!.inStudyTotalSavings).toBe(3999600);
      expect(result!.inStudyPerEnrolleeSavings).toBe(79992);
    });

    it('calculates correct total savings without post-trial', () => {
      const result = calculateSavings(baseParams);
      
      expect(result).not.toBeNull();
      expect(result!.totalSavings).toBe(4000000);
      expect(result!.expectedPostTrialSavings).toBe(0);
    });
  });

  describe('Post-trial calculations', () => {
    const postTrialParams = {
      ...baseParams,
      postTrialHorizon: 24,
      postTrialAdoption: 80,
      probabilityOfTrialSuccess: 70,
    };

    it('calculates post-trial savings correctly', () => {
      const result = calculateSavings(postTrialParams);
      
      expect(result).not.toBeNull();
      expect(result!.expectedPostTrialSavings).toBe(4480000); // 50 * 80,000 * 2 * 0.8 * 0.7
      expect(result!.totalSavings).toBe(8480000); // in-study + post-trial
    });

    it('applies discount rate correctly', () => {
      const discountParams = {
        ...postTrialParams,
        discountRateForNPV: 10,
      };

      const result = calculateSavings(discountParams);
      
      expect(result).not.toBeNull();
      // Post-trial should be discounted: 4480000 / (1.1)^2 ≈ 3702479
      expect(result!.expectedPostTrialSavings).toBe(3702479);
      expect(result!.totalSavings).toBe(7702479);
    });
  });

  describe('ROI and Savings Multiple calculations', () => {
    it('calculates ROI and savings multiple with program fee', () => {
      const feeParams = {
        ...baseParams,
        optionalProgramFeeToPayer: 1000000,
      };

      const result = calculateSavings(feeParams);
      
      expect(result).not.toBeNull();
      expect(result!.roi).toBe(300); // (4M - 1M) / 1M * 100 = 300%
      expect(result!.savingsMultiple).toBe(4); // 4M / 1M = 4x
    });

    it('returns zero ROI when no program fee', () => {
      const result = calculateSavings(baseParams);
      
      expect(result).not.toBeNull();
      expect(result!.roi).toBe(0);
      expect(result!.savingsMultiple).toBe(0);
    });
  });

  describe('Edge cases and validation', () => {
    it('returns null when required parameters are missing', () => {
      const incompleteParams = {
        ...baseParams,
        expensiveDrugCost: 0,
      };

      const result = calculateSavings(incompleteParams);
      expect(result).toBeNull();
    });

    it('handles zero trial duration', () => {
      const zeroParams = {
        ...baseParams,
        trialDuration: 0,
      };

      const result = calculateSavings(zeroParams);
      expect(result).toBeNull();
    });

    it('handles partial post-trial parameters gracefully', () => {
      const partialParams = {
        ...baseParams,
        postTrialHorizon: 24,
        // Missing postTrialAdoption and probabilityOfTrialSuccess
      };

      const result = calculateSavings(partialParams);
      
      expect(result).not.toBeNull();
      expect(result!.expectedPostTrialSavings).toBe(0);
      expect(result!.totalSavings).toBe(4000000);
    });

    it('handles mixed cost basis correctly', () => {
      const mixedParams = {
        ...baseParams,
        expensiveDrugCost: 8333,
        alternativeDrugCost: 20000,
        specialtyCostBasis: 'per-month' as const,
        alternativeCostBasis: 'per-year' as const,
      };

      const result = calculateSavings(mixedParams);
      
      expect(result).not.toBeNull();
      // Monthly expensive: 8333 * 12 = 99996
      // Annual alternative: 20000
      // Difference: 79996 per enrollee per year
      expect(result!.inStudyPerEnrolleeSavings).toBe(79996);
    });
  });

  describe('Complex scenario', () => {
    it('calculates comprehensive scenario correctly', () => {
      const complexParams = {
        expensiveDrugCost: 150000,
        alternativeDrugCost: 30000,
        specialtyCostBasis: 'per-year' as const,
        alternativeCostBasis: 'per-year' as const,
        membersInHealthPlan: 200,
        trialEnrollmentRate: 75,
        perEnrolleePriceToPayer: 85,
        trialDuration: 18,
        postTrialHorizon: 36,
        postTrialAdoption: 90,
        probabilityOfTrialSuccess: 80,
        discountRateForNPV: 5,
        optionalProgramFeeToPayer: 2000000,
      };

      const result = calculateSavings(complexParams);
      
      expect(result).not.toBeNull();
      
      // Verify calculations step by step
      const enrollees = 200 * 0.75; // 150
      const costDifference = 150000 - 30000; // 120,000
      const trialYears = 18 / 12; // 1.5
      const inStudyTotal = enrollees * costDifference * trialYears; // 27,000,000
      
      expect(result!.inStudyTotalSavings).toBe(27000000);
      expect(result!.inStudyPerEnrolleeSavings).toBe(180000);
      
      // Post-trial with NPV
      const postTrialYears = 36 / 12; // 3
      const discountFactor = 1 / Math.pow(1.05, 3); // ≈ 0.8638
      const expectedPostTrial = enrollees * costDifference * postTrialYears * 0.9 * 0.8 * discountFactor;
      
      expect(result!.expectedPostTrialSavings).toBe(Math.round(expectedPostTrial));
      
      // ROI calculation
      const totalSavings = result!.inStudyTotalSavings + result!.expectedPostTrialSavings;
      const expectedROI = ((totalSavings - 2000000) / 2000000) * 100;
      
      expect(result!.roi).toBe(Math.round(expectedROI * 100) / 100);
    });
  });
});