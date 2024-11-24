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

const addVolunteer = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [availability, setAvailability] = useState("");
  const [dateJoined, setDateJoined] = useState("");

  const handleRegister = () => {
    const volunteerData = {
      userId: userId,
      name: name,
      email: email,
      phone: phone,
      availability: availability,
      dateJoined: dateJoined,
    };

    axios
      .post("http://192.168.8.140:8000/addVolunteer", volunteerData)
      .then((response) => {
        Alert.alert(
          "Event Created",
          "Your volunteer has been added successfully."
        );
        // Clear input fields
        setUserId("");
        setName("");
        setEmail("");
        setPhone("");
        setAvailability("");
        setDateJoined("");
      })
      .catch((error) => {
        Alert.alert(
          "Volunteer Creation Failed",
          "An error occurred while adding the volunteer."
        );
        console.log("Volunteer Creation Failed", error);
      });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a New Volunteer
        </Text>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>User ID</Text>
          <TextInput
            value={userId}
            onChangeText={(text) => setUserId(text)}
            style={styles.input}
            placeholder="Enter User ID"
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor={"black"}
            keyboardType="email-address"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            style={styles.input}
            placeholder="Enter Phone Number"
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Availability</Text>
          <TextInput
            value={availability}
            onChangeText={(text) => setAvailability(text)}
            style={styles.input}
            placeholder="Enter Weekly Availability"
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Joined Date</Text>
          <TextInput
            value={dateJoined}
            onChangeText={(text) => setDateJoined(text)}
            style={styles.input}
            placeholder="Enter Date Joined"
            placeholderTextColor={"black"}
          />
        </View>

        <Pressable onPress={handleRegister} style={styles.button}>
          <Text style={{ fontWeight: "bold", color: "white" }}>Add Event</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default addVolunteer;

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
