import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useNavigation and useRoute
import axios from "axios";

const EditEvent = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute to get navigation parameters
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: {
      name: "",
      contactEmail: "",
    },
    maxParticipants: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const id = route.params?.id; // Access ID from route params
    console.log("Event ID:", id);
    const fetchEventDetails = async () => {
      if (!id) {
        setLoading(false);
        setError("Event ID not provided");
        return;
      }

      console.log("Fetching details for ID:", id);

      try {
        const response = await axios.get(
          `http://192.168.8.169:5000/events/${id}`
        );
        console.log("Fetched event data:", response.data);

        if (response.data) {
          setEventDetails(response.data);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        console.error(
          "Fetch error:",
          err.response ? err.response.data : err.message
        );
        if (err.response && err.response.status === 404) {
          setError("Event not found");
        } else {
          setError(err.response ? err.response.data.message : err.message);
        }
        Alert.alert(
          "Error",
          err.response ? err.response.data.message : err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [route.params?.id]);

  const handleChange = (name, value) => {
    if (name.includes("organizer")) {
      const key = name.split(".")[1];
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        organizer: {
          ...prevDetails.organizer,
          [key]: value,
        },
      }));
    } else {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const eventId = route.params?.id; // Use optional chaining to safely access the ID
      console.log("Event ID:", eventId); // Log the ID to verify
      console.log("Event ID being updated:", route.params?.id);

  
      const response = await axios.put(
        `http://192.168.8.140:8000/events/${eventId}`, // Ensure this is the correct ID from route params
        eventDetails
      );
  
      setSuccessMessage(response.data.message);
      setError("");
      Alert.alert("Success", response.data.message);
    } catch (err) {
      console.error(
        "Update error:",
        err.response ? err.response.data : err.message
      );
      setError(err.response ? err.response.data.message : err.message);
      setSuccessMessage("");
      Alert.alert(
        "Error",
        err.response ? err.response.data.message : err.message
      );
    }
  };
  

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Update Event</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? (
        <Text style={styles.success}>{successMessage}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={eventDetails.title}
        onChangeText={(value) => handleChange("title", value)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={eventDetails.description}
        onChangeText={(value) => handleChange("description", value)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DDTHH:MM)"
        value={eventDetails.date}
        onChangeText={(value) => handleChange("date", value)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={eventDetails.location}
        onChangeText={(value) => handleChange("location", value)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Organizer Name"
        value={eventDetails.organizer.name}
        onChangeText={(value) => handleChange("organizer.name", value)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Organizer Email"
        value={eventDetails.organizer.contactEmail}
        onChangeText={(value) => handleChange("organizer.contactEmail", value)}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Max Participants"
        value={eventDetails.maxParticipants}
        onChangeText={(value) => handleChange("maxParticipants", value)}
        keyboardType="numeric"
        required
      />

      <Button title="Update Event" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default EditEvent;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  success: {
    color: "green",
    marginBottom: 10,
  },
});
