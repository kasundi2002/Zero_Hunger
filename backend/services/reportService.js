// reportService.js

const FoodDonation = require('../models/FoodDonation');
const Volunteer = require('../models/Volunteer');
const Restaurant = require('../models/Restaurant');
const OrphanageRequest = require('../models/OrphanageRequest');
const VolunteerActivity = require('../models/VolunteerActivity');


// Get Food Distribution Summary
const getFoodDistributionSummary = async () => {
  const totalFoodDistributed = await FoodDonation.aggregate([
    {
      $group: {
        _id: null,
        totalQuantity: { $sum: "$quantity" },
      },
    },
  ]);
  return { totalFoodDistributed: totalFoodDistributed[0]?.totalQuantity || 0 };
};

// Get Volunteer Contributions Summary
const getVolunteerContributionsSummary = async () => {
  const volunteerActivities = await VolunteerActivity.aggregate([
    {
      $group: {
        _id: "$volunteer",
        totalHours: { $sum: "$hoursWorked" },
        activities: { $push: "$activityType" },
      },
    },
  ]);
  return volunteerActivities;
};

// Get Waste Reduction Summary
const getWasteReductionSummary = async () => {
  const wasteReduction = await FoodDonation.aggregate([
    {
      $group: {
        _id: "$restaurant",
        totalWasteReduced: { $sum: "$wasteReduction" },
      },
    },
  ]);
  return wasteReduction;
};

// Get Orphanage Requests vs Fulfillment Summary
const getOrphanageRequestsFulfillmentSummary = async () => {
  const requestsData = await OrphanageRequest.aggregate([
    {
      $group: {
        _id: "$orphanage",
        totalRequests: { $sum: 1 },
        fulfilledRequests: {
          $sum: {
            $cond: [{ $eq: ["$status", "fulfilled"] }, 1, 0],
          },
        },
      },
    },
  ]);
  return requestsData;
};

// Get Event Impact Summary


// Get Monthly Food Distribution Data for Chart
const getMonthlyFoodDistributionData = async () => {
  const monthlyDistribution = await FoodDonation.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        totalQuantity: { $sum: "$quantity" },
      },
    },
    { $sort: { "_id": 1 } }
  ]);
  return monthlyDistribution;
};

// Get Volunteer Growth Data for Chart
const getVolunteerGrowthData = async () => {
  const volunteerGrowth = await Volunteer.aggregate([
    {
      $group: {
        _id: { $month: "$registeredDate" },
        totalVolunteers: { $sum: 1 },
      },
    },
    { $sort: { "_id": 1 } }
  ]);
  return volunteerGrowth;
};

// Get Cumulative Food Donations Data for Chart
const getCumulativeFoodDonationsData = async () => {
  const cumulativeData = await FoodDonation.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        totalQuantity: { $sum: "$quantity" },
      },
    },
    { $sort: { "_id": 1 } }
  ]);
  return cumulativeData;
};

// Get Orphanage Needs vs Supplies Data for Chart
const getOrphanageNeedsVsSuppliesData = async () => {
  const needsVsSupplies = await OrphanageRequest.aggregate([
    {
      $group: {
        _id: "$orphanage",
        totalRequested: { $sum: "$quantityRequested" },
        totalDelivered: { $sum: "$quantityDelivered" },
      },
    },
  ]);
  return needsVsSupplies;
};

module.exports = {
  getFoodDistributionSummary,
  getVolunteerContributionsSummary,
  getWasteReductionSummary,
  getOrphanageRequestsFulfillmentSummary,
  getMonthlyFoodDistributionData,
  getVolunteerGrowthData,
  getCumulativeFoodDonationsData,
  getOrphanageNeedsVsSuppliesData,
};
