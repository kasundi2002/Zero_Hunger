// routes/authRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const {register,login,getUserProfile,addFoodWastage,getFoodWastageDetails,updateFoodWastageStatus,getFoodWastageByHotelOwner,addVolunteer,volunteerLogin,deleteFoodWastage} = require("../controllers/authcontroller");
const {
  register: registerOrg,
  login: loginOrg,
} = require("../controllers/orgauthcontroller");
const authMiddleware = require("../middleware/authmiddleware");
const FoodNeed = require("../models/foodneeds");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/foodwastage", getFoodWastageDetails);
router.get("/user/me", authMiddleware, (req, res) => {
  console.log("Route /user/me was hit"); // Add this log
  getUserProfile(req, res);
});
router.post("/foodwastage", authMiddleware, addFoodWastage);
router.patch('/foodwastage/:id', updateFoodWastageStatus);
router.get('/foodwastage/mywastage', getFoodWastageByHotelOwner);
router.post('/add', addVolunteer);
router.post('/volunteer-login', volunteerLogin);
router.delete('/foodwastage/:id', deleteFoodWastage);




// Organization Routes
router.post("/organization/register", registerOrg); // Route for organization registration
router.post("/organization/login", loginOrg); // Route for organization login
router.get("/organization/profile", authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

// Route to create food need
router.post("/food", authMiddleware, async (req, res) => {
  const { foodItem, people, requiredDate } = req.body;

  try {
    const newFoodNeed = new FoodNeed({
      foodItem,
      people,
      requiredDate,
      organizationId: req.user._id, // Use req.user._id to associate the food need with the organization
    });

    await newFoodNeed.save();
    res
      .status(201)
      .json({ message: "Food need posted successfully", newFoodNeed });
  } catch (error) {
    res.status(500).json({ message: "Error posting food need", error });
  }
});

// Route to get food needs for an organization
// Route to get food needs for an organization
router.get("/food", authMiddleware, async (req, res) => {
  try {
    const foodNeeds = await FoodNeed.find({ organizationId: req.user._id }); // Fetch food needs for authenticated organization
    res.status(200).json(foodNeeds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food needs", error });
  }
});

// Route to update food need
// Route to update food need
router.put("/food/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { foodItem, people, requiredDate } = req.body;

  try {
    const foodNeed = await FoodNeed.findById(id);

    // Check if the food need exists and belongs to the logged-in organization
    if (
      !foodNeed ||
      foodNeed.organizationId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(404)
        .json({ message: "Food need not found or not authorized" });
    }

    // Update the food need
    foodNeed.foodItem = foodItem;
    foodNeed.people = people;
    foodNeed.requiredDate = requiredDate;

    await foodNeed.save();
    res
      .status(200)
      .json({ message: "Food need updated successfully", foodNeed });
  } catch (error) {
    res.status(500).json({ message: "Error updating food need", error });
  }
});

// Route to delete food need
// Route to delete food need
router.delete("/food/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // Log the current user for debugging
    console.log("Current user:", req.user);

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const foodNeed = await FoodNeed.findById(id);

    // Log the retrieved food need for debugging
    console.log("Retrieved food need:", foodNeed);

    // Check if the food need exists and belongs to the logged-in organization
    if (
      !foodNeed ||
      foodNeed.organizationId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(404)
        .json({ message: "Food need not found or not authorized" });
    }

    // Use deleteOne instead of remove
    await FoodNeed.deleteOne({ _id: id });

    res.status(200).json({ message: "Food need deleted successfully" });
  } catch (error) {
    // Log specific error message
    console.error("Error deleting food need:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting food need", error: error.message });
  }
});

module.exports = router;
