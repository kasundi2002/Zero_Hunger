// Handles volunteer actions

const Report = require('../models/Report');
const reportService = require('../services/reportService');


// Create a new report
const createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('generatedBy');
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single report by ID
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('generatedBy');
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getFoodDistributionReport = async (req, res) => {
  try {
    const reportData = await reportService.getFoodDistributionSummary();
    res.json(reportData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Food Distribution Report' });
  }
};

// Controller to get Volunteer Contributions Report
const getVolunteerContributionsReport = async (req, res) => {
  try {
    const reportData = await reportService.getVolunteerContributionsSummary();
    res.json(reportData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Volunteer Contributions Report' });
  }
};

// Controller to get Waste Reduction Report
const getWasteReductionReport = async (req, res) => {
  try {
    const reportData = await reportService.getWasteReductionSummary();
    res.json(reportData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Waste Reduction Report' });
  }
};

// Controller to get Orphanage Requests vs Fulfillment Report
const getOrphanageRequestsFulfillmentReport = async (req, res) => {
  try {
    const reportData = await reportService.getOrphanageRequestsFulfillmentSummary();
    res.json(reportData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Orphanage Requests vs Fulfillment Report' });
  }
};

// Controller to get Event Impact Report
const getEventImpactReport = async (req, res) => {
  try {
    const reportData = await reportService.getEventImpactSummary();
    res.json(reportData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Event Impact Report' });
  }
};

// Controller to get Monthly Food Distribution Chart Data
const getMonthlyFoodDistributionChart = async (req, res) => {
  try {
    const chartData = await reportService.getMonthlyFoodDistributionData();
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Monthly Food Distribution Chart Data' });
  }
};

// Controller to get Volunteer Growth Chart Data
const getVolunteerGrowthChart = async (req, res) => {
  try {
    const chartData = await reportService.getVolunteerGrowthData();
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Volunteer Growth Chart Data' });
  }
};

// Controller to get Cumulative Food Donations Chart Data
const getCumulativeFoodDonationsChart = async (req, res) => {
  try {
    const chartData = await reportService.getCumulativeFoodDonationsData();
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Cumulative Food Donations Chart Data' });
  }
};

// Controller to get Orphanage Needs vs Supplies Chart Data
const getOrphanageNeedsVsSuppliesChart = async (req, res) => {
  try {
    const chartData = await reportService.getOrphanageNeedsVsSuppliesData();
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Orphanage Needs vs Supplies Chart Data' });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  getFoodDistributionReport,
  getVolunteerContributionsReport,
  getWasteReductionReport,
  getOrphanageRequestsFulfillmentReport,
  getEventImpactReport,
  getMonthlyFoodDistributionChart,
  getVolunteerGrowthChart,
  getCumulativeFoodDonationsChart,
  getOrphanageNeedsVsSuppliesChart,
};



