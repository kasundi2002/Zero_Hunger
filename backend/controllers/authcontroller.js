const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FoodWastage = require('../models/FoodWastage');


const register = async (req, res) => {
    const { hotelname, hotelregistration, hotelowner, email, password, nic, address, mobileno } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Create new user
      const newUser = new User({
        hotelname,
        hotelregistration,
        hotelowner,
        email,
        password: hashedPassword,
        nic,
        address,  // No special validation for address in backend
        mobileno,
      });
  
      // Save user in database
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };



// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, hotelowner: user.hotelowner }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                hotelname: user.hotelname,
                hotelowner: user.hotelowner,
                email: user.email,
                nic: user.nic,
                address: user.address,
                mobileno: user.mobileno,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error', error: error.message || 'Unknown error' });
    }
};


// Controller to fetch user details by ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password'); // Exclude the password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            user: {
                id: user._id,
                hotelname: user.hotelname,
                hotelowner: user.hotelowner,
                email: user.email,
                nic: user.nic,
                address: user.address,
                mobileno: user.mobileno,
            },
        });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getUserProfile = async (req, res) => {
    try {
      console.log('Fetching profile for user ID:', req.user._id); // This should now log the correct user ID
  
      const user = await User.findById(req.user._id).select('-password');
  
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  const addFoodWastage = async (req, res) => {
    try {
        const { hotelname, hotelowner, address, people, foodDescription } = req.body;

        // Validation
        if (!hotelname || !hotelowner || !address || !people || !foodDescription) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (isNaN(people)) {
            return res.status(400).json({ success: false, message: 'Number of people must be a valid number' });
        }

        // Create new food wastage entry with default status
        const foodWastage = new FoodWastage({
            hotelname,
            hotelowner,
            address,
            people,
            foodDescription,
            status: 'No volunteer assigned' // Default status
        });

        await foodWastage.save();

        res.status(201).json({
            success: true,
            message: 'Food wastage details submitted successfully!',
            data: foodWastage
        });
    } catch (error) {
        console.error('Error saving food wastage details:', error);
        res.status(500).json({
            success: false,
            message: 'Server error, unable to submit food wastage details'
        });
    }
};

const updateFoodWastageStatus = async (req, res) => {
    const { id } = req.params; // Extract the ID from the URL parameters
    const { status } = req.body; // Extract the new status from the request body

    try {
        // Find the food wastage item by ID and update the status
        const updatedItem = await FoodWastage.findByIdAndUpdate(
            id,
            { status: status }, // Update the status field
            { new: true, runValidators: true } // Options: return the new document and run validators
        );

        // Check if the item was found and updated
        if (!updatedItem) {
            return res.status(404).json({ message: 'Food wastage item not found.' });
        }

        // Send the updated item back in the response
        res.status(200).json({ message: 'Status updated successfully!', data: updatedItem });
    } catch (error) {
        console.error('Error updating food wastage status:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


// Retrieve food wastage details
const getFoodWastageDetails = async (req, res) => {
    try {
        // Include 'status' in the fields to select
        const foodWastageList = await FoodWastage.find().select('hotelname hotelowner address people foodDescription createdAt status');
        res.status(200).json({ success: true, data: foodWastageList });
    } catch (error) {
        console.error('Error retrieving food wastage details:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getFoodWastageByHotelOwner = async (req, res) => {
    try {
        // Extract token from the request header
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log("Extracted token:", token); // Log the token

        // Verify the token to get the user's details
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hotelowner = decoded.hotelowner;
        console.log("Hotel owner from token:", hotelowner); // Log the hotelowner

        // Find food wastage details added by the specific hotel owner
        const foodWastageList = await FoodWastage.find({ hotelowner }).select('hotelname hotelowner address people foodDescription createdAt status');

        if (!foodWastageList || foodWastageList.length === 0) {
            return res.status(404).json({ success: false, message: 'No food wastage records found for this user.' });
        }

        res.status(200).json({ success: true, data: foodWastageList });
    } catch (error) {
        console.error('Error fetching food wastage details for hotel owner:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

const Volunteer = require('../models/volunteerr');

// Add new volunteer
const addVolunteer = async (req, res) => {
    try {
        const { name, email, nic, phoneNumber } = req.body;

        // Check if volunteer already exists
        const existingVolunteer = await Volunteer.findOne({ email });
        if (existingVolunteer) {
            return res.status(400).json({ message: 'Volunteer with this email already exists.' });
        }

        // Create a new volunteer
        const newVolunteer = new Volunteer({
            name,
            email,
            nic,
            phoneNumber
        });

        await newVolunteer.save();
        res.status(201).json({ message: 'Volunteer added successfully', volunteer: newVolunteer });
    } catch (error) {
        res.status(500).json({ message: 'Error adding volunteer', error });
    }
};

const volunteerLogin = async (req, res) => {
    try {
        const { email, nic } = req.body;

        if (!email || !nic) {
            return res.status(400).json({ message: 'Email and NIC are required' });
        }

        // Find volunteer by email and NIC
        const volunteer = await Volunteer.findOne({ email, nic });

        if (!volunteer) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If you have a password field and want to verify, you can do it here
        // const isMatch = await bcrypt.compare(password, volunteer.password);
        // if (!isMatch) {
        //     return res.status(401).json({ message: 'Invalid credentials' });
        // }

        return res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error logging in volunteer:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const deleteFoodWastage = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the food wastage entry by ID and delete it
        const foodWastage = await FoodWastage.findByIdAndDelete(id);

        // If no entry is found, return a 404 error
        if (!foodWastage) {
            return res.status(404).json({
                success: false,
                message: 'Food wastage entry not found',
            });
        }

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Food wastage entry deleted successfully',
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({
            success: false,
            message: 'Server error while deleting food wastage entry',
            error: error.message,
        });
    }
};

module.exports = { login, register,getUserById, getUserProfile,addFoodWastage,getFoodWastageDetails,updateFoodWastageStatus,getFoodWastageByHotelOwner,addVolunteer,volunteerLogin,deleteFoodWastage };
