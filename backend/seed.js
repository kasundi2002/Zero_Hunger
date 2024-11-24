// // step 1

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// // Models
// const Event = require('./models/Event');
// const FoodDonation = require('./models/FoodDonation');
// const Orphanage = require('./models/Orphanage');
// const OrphanageRequest = require('./models/OrphanageRequest');
// const Report = require('./models/Report');
// const Restaurant = require('./models/Restaurant'); 
// const UserModel = require('./models/kasundi/usermodel');
// const Volunteer = require('./models/Volunteer');
// const VolunteerActivity = require('./models/VolunteerActivity');

// // Data files
// const eventData = require('./data/eventData');
// const foodDonationData = require('./data/foodDonationData');
// const orphanageData = require('./data/orphanageData');
// const orphanageRequestData = require('./data/orphanageRequestData');
// const restaurantData = require('./data/restaurantData'); 
// const userData = require('./data/userData');
// const volunteerActivityData = require('./data/volunteerActivityData');
// const volunteerData = require('./data/volunteerData');

// // Load environment variables
// dotenv.config();

// // MongoDB connection
// const insertData = async () => {
//     console.log(`Inside seed.js insert data`);
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');


//    // Insert data into collections with try-catch for each
//     try {
//         await UserModel.insertMany(userData);
//         console.log('Users inserted successfully');
//       } catch (err) {
//         console.error('Error inserting users:', err);
//       }
//     try {
//       await Restaurant.insertMany(restaurantData);
//       console.log('Restaurants inserted successfully');
//     } catch (err) {
//       console.error('Error inserting restaurants:', err);
//     }
//     try {
//         await Orphanage.insertMany(orphanageData);
//         console.log('Orphanages inserted successfully');
//       } catch (err) {
//         console.error('Error inserting orphanages:', err);
//       }
//     try {
//     await Volunteer.insertMany(volunteerData);
//     console.log('Volunteers inserted successfully');
//     } catch (err) {
//     console.error('Error inserting volunteers:', err);
//     }
  
//     try {
//         await Event.insertMany(eventData);
//         console.log('Events inserted successfully');
//       } catch (err) {
//         console.error('Error inserting events:', err);
//       }

//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//   } finally {
//     mongoose.connection.close(); // Ensure connection closes after all attempts
//   }
// };

// // Call the insertData function
// insertData();


//step 2

// const mongoose = require('mongoose');
// require('dotenv').config();

// const Restaurant = require('./models/Restaurant');
// const Volunteer = require('./models/Volunteer');
// const Orphanage = require('./models/Orphanage');
// const FoodDonation = require('./models/FoodDonation');
// const VolunteerActivity = require('./models/VolunteerActivity');
// const OrphanageRequest = require('./models/OrphanageRequest');
// const foodDonationData = require('./data/foodDonationData'); // Assuming foodDonation data is in this file
// const volunteerActivityData = require('./data/volunteerActivityData'); // Assuming volunteerActivity data in this file
// const orphanageRequestData = require('./data/orphanageRequestData'); // Assuming orphanageRequest data in this file

// async function insertData() {
//   try {
//     console.log('MongoDB connected');

//     // Fetch all restaurants and orphanages
//     const restaurants = await Restaurant.find();
//     const restaurantMap = {};

//     // Map restaurant names to their ObjectIds
//     restaurants.forEach((restaurant) => {
//       restaurantMap[restaurant.name] = restaurant._id;
//     });

//     // Replace restaurant names in food donations with their ObjectIds
//     const foodDonations = foodDonationData.map((donation) => {
//       const restaurantId = restaurantMap[donation.restaurant];
//       if (!restaurantId) {
//         throw new Error(`Restaurant ${donation.restaurant} not found`);
//       }

//       return {
//         ...donation,
//         restaurant: restaurantId, // Replace with ObjectId
//       };
//     });

//     // Insert food donations
//     await FoodDonation.insertMany(foodDonations);
//     console.log('Food donations inserted successfully');

//   } catch (error) {
//     console.error('Error inserting data:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// const mongoURI = process.env.MONGO_URI;
// // Connect to MongoDB and insert data
// mongoose
//   .connect(mongoURI)
//   .then(() => {
//     console.log('Inside seed.js insert data');
//     insertData();
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });

//step 3

const mongoose = require('mongoose');
require('dotenv').config();

const Volunteer = require('./models/Volunteer');
const Orphanage = require('./models/Orphanage');
const VolunteerActivity = require('./models/VolunteerActivity');
const OrphanageRequest = require('./models/OrphanageRequest');
const volunteerActivityData = require('./data/volunteerActivityData'); 
const orphanageRequestData = require('./data/orphanageRequestData'); 

async function insertData() {
  try {
    console.log('MongoDB connected');

    // Fetch all volunteers and orphanages
    const volunteers = await Volunteer.find();
    const volunteerMap = {};

    // Map volunteer names to their ObjectIds
    volunteers.forEach((volunteer) => {
      volunteerMap[volunteer.name] = volunteer._id;
    });

    // Replace volunteer names in activities with their ObjectIds
    const volunteerActivities = volunteerActivityData.map((activity) => {
      const volunteerId = volunteerMap[activity.volunteer];
      if (!volunteerId) {
        throw new Error(`Volunteer ${activity.volunteer} not found`);
      }

      return {
        ...activity,
        volunteer: volunteerId, // Replace with ObjectId
      };
    });

    // Insert volunteer activities
    await VolunteerActivity.insertMany(volunteerActivities);
    console.log('Volunteer activities inserted successfully');

    // Orphanage Requests Insertions
    const orphanages = await Orphanage.find();
    const orphanageMap = {};

    // Map orphanage names to their ObjectIds
    orphanages.forEach((orphanage) => {
      orphanageMap[orphanage.name] = orphanage._id;
    });

    // Replace orphanage names in requests with their ObjectIds
    const orphanageRequests = orphanageRequestData.map((request) => {
      const orphanageId = orphanageMap[request.orphanage];
      if (!orphanageId) {
        throw new Error(`Orphanage ${request.orphanage} not found`);
      }

      return {
        ...request,
        orphanage: orphanageId, // Replace with ObjectId
      };
    });

    // Insert orphanage requests
    await OrphanageRequest.insertMany(orphanageRequests);
    console.log('Orphanage requests inserted successfully');

  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.connection.close();
  }
}

const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB and insert data
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Inside seed.js insert data');
    insertData();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });





