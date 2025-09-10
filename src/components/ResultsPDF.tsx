import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
  },
});

interface ResultsPDFProps {
  data?: {
    currency?: string;
    expensiveDrugCost?: number | string;
    alternativeDrugCost?: number | string;
    membersInHealthPlan?: number | string;
    enrollmentRate?: number | string;
    trialEnrollmentRate?: number | string;
    perEnrolleePriceToPayer?: number | string;
    postTrialAdoption?: number | string;
    probabilityOfTrialSuccess?: number | string;
    trialDuration?: number | string;
    postTrialHorizon?: number | string;
    discountRateForNPV?: number | string;
    optionalProgramFeeToPayer?: number | string;
    inStudyTotalSavings?: number | string;
    inStudyPerEnrolleeSavings?: number | string;
    expectedPostTrialSavings?: number | string;
    totalSavings?: number | string;
    savingsMultiple?: number | string;
    roi?: number | string;
  };
}

// PDF Document Component
export const ResultsPDF: React.FC<ResultsPDFProps> = ({ data = {} }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Public Good Pharma Calculator - Results</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>In-Study Savings</Text>
        <Text style={styles.text}>Total Savings: ${data.inStudyTotalSavings || '0'}</Text>
        <Text style={styles.text}>Per Enrollee: ${data.inStudyPerEnrolleeSavings || '0'}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expected Post-Trial Savings</Text>
        <Text style={styles.text}>Success-weighted over horizon: ${data.expectedPostTrialSavings || '0'}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Savings</Text>
        <Text style={styles.text}>In-study + Post-trial: ${data.totalSavings || '0'}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Savings Multiple / ROI</Text>
        <Text style={styles.text}>Savings Multiple: {data.savingsMultiple || '0'}x</Text>
        <Text style={styles.text}>ROI: {data.roi || '0'}%</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Drivers</Text>
        <Text style={styles.text}>• Enrollment: {data.enrollmentRate || '0'}%</Text>
        <Text style={styles.text}>• Price during study: {data.perEnrolleePriceToPayer || '0'}%</Text>
        <Text style={styles.text}>• Adoption: {data.postTrialAdoption || '0'}%</Text>
        <Text style={styles.text}>• Success: {data.probabilityOfTrialSuccess || '0'}%</Text>
      </View>

      <Text style={styles.footer}>
        Generated on: {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);