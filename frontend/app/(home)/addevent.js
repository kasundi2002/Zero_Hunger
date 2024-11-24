import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import axios from "axios";
  
  
  const AddEvent = () => {
    const [eventId, setEventId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [organizerName, setOrganizerName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
  
    const handleRegister = () => {
        // Validate the date input before creating the eventData object
        if (!date || isNaN(new Date(date))) {
          Alert.alert("Invalid Date", "Please select a valid date.");
          return;
        }
      
        const eventData = {
          eventId: eventId.trim(),
          title: title.trim(),
          description: description.trim(),
          date: new Date(date).toISOString(), // Ensure the date is sent in ISO format
          location: location.trim(),
          organizer: {
            name: organizerName.trim(),
            contactEmail: contactEmail.trim(),
          },
          participants: [], // Initially no participants
          maxParticipants: parseInt(maxParticipants, 10), // Convert to number
          status: "active", // Default status
        };
      
        axios
          .post("http://192.168.8.169:5000/addEvent", eventData)
          .then((response) => {
            Alert.alert(
              "Event Created",
              "Your event has been created successfully."
            );
            // Clear input fields
            setEventId("");
            setTitle("");
            setDescription("");
            setDate("");
            setLocation("");
            setOrganizerName("");
            setContactEmail("");
            setMaxParticipants("");
          })
          .catch((error) => {
            Alert.alert(
              "Event Creation Failed",
              "An error occurred while creating the event."
            );
            console.log("Event Creation Failed", error.response?.data || error);
          });
      };
      
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Add a New Event
          </Text>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Event ID</Text>
            <TextInput
              value={eventId}
              onChangeText={(text) => setEventId(text)}
              style={styles.input}
              placeholder="Enter Event ID"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Title</Text>
            <TextInput
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={styles.input}
              placeholder="Enter Event Title"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Description</Text>
            <TextInput
              value={description}
              onChangeText={(text) => setDescription(text)}
              style={styles.input}
              placeholder="Enter Event Description"
              placeholderTextColor={"black"}
              multiline
              numberOfLines={4}
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Date</Text>
            <TextInput
              value={date}
              onChangeText={(text) => setDate(text)}
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Location</Text>
            <TextInput
              value={location}
              onChangeText={(text) => setLocation(text)}
              style={styles.input}
              placeholder="Enter Location"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Organizer Name
            </Text>
            <TextInput
              value={organizerName}
              onChangeText={(text) => setOrganizerName(text)}
              style={styles.input}
              placeholder="Enter Organizer Name"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Organizer Email
            </Text>
            <TextInput
              value={contactEmail}
              onChangeText={(text) => setContactEmail(text)}
              style={styles.input}
              placeholder="Enter Organizer Email"
              placeholderTextColor={"black"}
              keyboardType="email-address"
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Max Participants
            </Text>
            <TextInput
              value={maxParticipants}
              onChangeText={(text) => setMaxParticipants(text)}
              style={styles.input}
              placeholder="Max Participants"
              placeholderTextColor={"black"}
              keyboardType="numeric"
            />
          </View>
  
          <Pressable onPress={handleRegister} style={styles.button}>
            <Text  onPress={() => navigation.navigate("event")} style={{ fontWeight: "bold", color: "white" }}>Add Event</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  };
  
  export default AddEvent;
  
  const styles = StyleSheet.create({
    input: {
      padding: 10,
      borderColor: "#D0D0D0",
      borderWidth: 1,
      marginTop: 10,
      borderRadius: 5,
    },
    button: {
      backgroundColor: "#ABCABA",
      padding: 10,
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    },
  });
  