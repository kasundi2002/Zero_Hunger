require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const app = express();
//const authRoutes = require('./routes/authRoutes');

// Import routes
const eventRoutes = require('./routes/eventRoutes');
const foodDonationRoutes = require('./routes/foodDonationRoutes');
const orphanageRoutes = require('./routes/OrphanageRoutes');
const orphanageRequestRoutes = require('./routes/orphanageRequestRoutes');
const reportRoutes = require('./routes/reportRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes.js');
const userRoutes = require('./routes/userRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const volunteerActivityRoutes = require('./routes/volunteerActivityRoutes');

// Enable CORS with specific options
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://localhost:8081',
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
}


const corsOptions ={
    origin:'http://localhost:8081', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));



app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/food-donations', foodDonationRoutes);
app.use('/api/orphanages', orphanageRoutes);
app.use('/api/orphanage-requests', orphanageRequestRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/volunteer-activities', volunteerActivityRoutes);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('Error connecting to database:', err));


app.get('/', (req, res) => {
  res.send("Welcome to project Tech?H");
});

app.get('/gf', (req, res) => {
  res.send("Welcome to project Tech?Hostel");
});

// app.use('/api/auth', authRoutes);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
