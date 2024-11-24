const Organization = require("../models/organizationmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Organization
const register = async (req, res) => {
  const {
    orgName,
    orgRegistration,
    contactPerson,
    email,
    password,
    location,
    phoneNumber,
  } = req.body;

  console.log("Register request received with data:", req.body); // Log incoming request body

  try {
    // Check if organization already exists
    console.log(
      "Checking if organization already exists with email or registration."
    );
    const existingOrg = await Organization.findOne({
      $or: [{ email }, { orgRegistration }],
    });

    if (existingOrg) {
      console.log(
        "Organization already exists with email or registration:",
        existingOrg
      );
      return res.status(400).json({ message: "Organization already exists" });
    }

    // Create new organization without hashing the password
    console.log("Creating new organization without password hashing.");
    const org = new Organization({
      orgName,
      orgRegistration,
      contactPerson,
      email,
      password, // Store password as plain text
      location,
      phoneNumber,
      role: "organization", // Set role as 'organization'
    });

    // Save the organization
    console.log("Saving the new organization to the database.");
    await org.save();
    console.log("Organization registered successfully:", org);
    res.status(201).json({ message: "Organization registered successfully" });
  } catch (error) {
    console.error("Error during organization registration:", error); // Log the error
    res.status(500).json({ message: "Server error", error });
  }
};

const getOrganizationProfile = async (req, res) => {
  try {
    const organizationId = req.user._id;
    console.log(`Fetching profile for organization ID: ${organizationId}`);

    // Find the organization by ID and exclude the password field
    const organization = await Organization.findById(organizationId).select(
      "-password"
    );

    if (!organization) {
      console.log(`Organization with ID ${organizationId} not found`);
      return res.status(404).json({ message: "Organization not found" });
    }

    // Respond with organization details
    res.status(200).json({
      id: organization._id,
      orgName: organization.orgName,
      orgRegistration: organization.orgRegistration,
      contactPerson: organization.contactPerson,
      email: organization.email,
      location: organization.location,
      phoneNumber: organization.phoneNumber,
      role: organization.role,
    });
  } catch (error) {
    console.error(
      `Error fetching profile for organization ID ${req.user._id}:`,
      error
    );

    // Ensure that this part doesn't execute after the response has already been sent
    if (!res.headersSent) {
      res.status(500).json({
        message:
          "An error occurred while fetching the profile. Please try again later.",
      });
    }
  }
};

// Function to update organization profile
const updateOrganizationProfile = async (req, res) => {
  const {
    orgName,
    orgRegistration,
    contactPerson,
    email,
    phoneNumber,
    location,
  } = req.body;

  try {
    // Find the organization by the authenticated user's ID (req.user._id)
    const organization = await Organization.findById(req.user._id);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Update the organization details
    organization.orgName = orgName || organization.orgName;
    organization.orgRegistration =
      orgRegistration || organization.orgRegistration;
    organization.contactPerson = contactPerson || organization.contactPerson;
    organization.email = email || organization.email;
    organization.phoneNumber = phoneNumber || organization.phoneNumber;
    organization.location = location || organization.location;

    await organization.save(); // Save the updated organization

    return res
      .status(200)
      .json({ message: "Profile updated successfully", organization });
  } catch (error) {
    return res.status(500).json({ message: "Error updating profile", error });
  }
};

// Organization Login
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received with data:", req.body); // Log incoming request body

  try {
    // Find organization by email
    console.log("Looking for organization with email:", email);
    const org = await Organization.findOne({ email });

    if (!org) {
      console.log("No organization found with email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Organization found:", org);

    // Check if the password matches (since we're not hashing)
    console.log(
      "Checking if the provided password matches the stored password."
    );
    if (password !== org.password) {
      console.log("Password does not match.");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token with role
    console.log("Password matched. Generating JWT token.");
    const token = jwt.sign(
      { id: org._id, role: org.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log("Login successful. Sending response.");
    return res.status(200).json({
      message: "Login successful",
      token,
      organization: {
        id: org._id,
        orgRegistration: org.orgRegistration,
        orgName: org.orgName,
        contactPerson: org.contactPerson,
        email: org.email,
        location: org.location,
        phoneNumber: org.phoneNumber,
        role: org.role, // Include the role in the response
      },
    });
  } catch (error) {
    console.error("Error during organization login:", error); // Log the error
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  register,
  login,
  getOrganizationProfile,
  updateOrganizationProfile,
};
