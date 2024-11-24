const express = require('express');
const { createReport, getAllReports, getReportById } = require('../controllers/reportController');
const router = express.Router();

const {
    getFoodDistributionReport,
    getVolunteerContributionsReport,
    getWasteReductionReport,
    getOrphanageRequestsFulfillmentReport,
    getEventImpactReport,
    getMonthlyFoodDistributionChart,
    getVolunteerGrowthChart,
    getCumulativeFoodDonationsChart,
    getOrphanageNeedsVsSuppliesChart,
  } = require('../controllers/reportController');

// Route to create a new report
router.post('/createReport', createReport);

// Route to get all reports
router.get('/getAllReports', getAllReports);

// Route to get a single report by ID
router.get('/getSingleReport/:id', getReportById);

// Route to get the food distribution report
router.get('/food-distribution', getFoodDistributionReport);

// Route to get the volunteer contributions report
router.get('/volunteer-contributions', getVolunteerContributionsReport);

// Route to get the waste reduction report
router.get('/waste-reduction', getWasteReductionReport);

// Route to get orphanage requests vs fulfillment report
router.get('/orphanage-requests', getOrphanageRequestsFulfillmentReport);

// Route to get event impact report
router.get('/event-impact', getEventImpactReport);

// Route to get monthly food distribution data for chart
router.get('/chart/food-distribution', getMonthlyFoodDistributionChart);

// Route to get volunteer growth data for chart
router.get('/chart/volunteer-growth', getVolunteerGrowthChart);

// Route to get cumulative food donations data for chart
router.get('/chart/cumulative-donations', getCumulativeFoodDonationsChart);

// Route to get orphanage needs vs supplies data for chart
router.get('/chart/orphanage-needs', getOrphanageNeedsVsSuppliesChart);


module.exports = router;
