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

// PDF Document Component
export const ResultsPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Public Good Pharma Calculator - Results</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>In-Study Savings (during trial)</Text>
        <Text style={styles.text}>Shows total and per-enrollee</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expected Post-Trial Savings</Text>
        <Text style={styles.text}>Success-weighted over horizon</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Savings</Text>
        <Text style={styles.text}>In-study + expected post-trial</Text>
        <Text style={styles.text}>Savings Multiple / ROI</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ROI Analysis</Text>
        <Text style={styles.text}>If Program fee &gt; 0, show ROI = Total savings ÷ Program fee.</Text>
        <Text style={styles.text}>Also show simple "in-study multiple" and "post-trial multiple" if helpful.</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Drivers</Text>
        <Text style={styles.text}>• Enrollment %</Text>
        <Text style={styles.text}>• % price during study</Text>
        <Text style={styles.text}>• Adoption %</Text>
        <Text style={styles.text}>• Success %</Text>
      </View>

      <Text style={styles.footer}>
        Generated on: {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);