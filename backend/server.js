require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const app = express();
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');


app.use(express.json());
app.use(cors());


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

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 9000");
});

const Event = require("./models/eventt");

//endpoint to register a events
app.post("/addEvent", async (req, res) => {
  try {
    const {
      eventId,
      title,
      description,
      date,
      location,
      organizer,
      maxParticipants,
    } = req.body;

    const newEvent = new Event({
      eventId,
      title,
      description,
      date,
      location,
      organizer,

      maxParticipants,
    });

    await newEvent.save();

    res
      .status(201)
      .json({ message: "Event saved successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Failed to add an event" });
  }
});

//endpoint to fetch all the events
app.get("/events", async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve events",
    });
  }
});

// Update Event
app.put("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId: id }, // Assuming you're searching by eventId
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        organizer: {
          name: req.body.organizer.name,
          contactEmail: req.body.organizer.contactEmail,
        },
        maxParticipants: req.body.maxParticipants,
        status: req.body.status,
      },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id); // Using MongoDB's default _id

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/events/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the event's MongoDB _id from the request parameters

    // Use findByIdAndUpdate with the correct _id
    const updatedEvent = await Event.findByIdAndUpdate(
      id, // Use the MongoDB _id
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        organizer: {
          name: req.body.organizer.name,
          contactEmail: req.body.organizer.contactEmail,
        },
        maxParticipants: req.body.maxParticipants,
      },
      { new: true } // Return the updated event
    );

    // Check if the event was found and updated
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Respond with success message and updated event data
    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error while updating event" });
  }
});

//delete event
app.delete("/events/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the event's MongoDB _id from the request parameters

    // Use findByIdAndDelete to remove the event with the given _id
    const deletedEvent = await Event.findByIdAndDelete(id);

    // Check if the event was found and deleted
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error while deleting event" });
  }
});

app.get("/event-report", (req, res) => {
  res.json({
    events: [
      {
        title: "Sample Event",
        date: "2024-10-01",
        participants: 10,
        maxParticipants: 50,
      },
      {
        title: "Another Event",
        date: "2024-10-10",
        participants: 5,
        maxParticipants: 20,
      },
      {
        title: "Sample Event",
        date: "2024-10-01",
        participants: 10,
        maxParticipants: 50,
      },
      {
        title: "Another Event",
        date: "2024-10-10",
        participants: 5,
        maxParticipants: 20,
      },
      {
        title: "Sample Event",
        date: "2024-10-01",
        participants: 10,
        maxParticipants: 50,
      },
      {
        title: "Another Event",
        date: "2024-10-10",
        participants: 5,
        maxParticipants: 20,
      },
    ],
  });
});