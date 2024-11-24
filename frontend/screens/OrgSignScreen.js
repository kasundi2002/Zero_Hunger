import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import axios from "axios";

const OrgSignScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    orgName: "",
    orgRegistration: "",
    contactPerson: "",
    email: "",
    password: "",
    location: "",
    phoneNumber: "",
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.8.169:5000/api/auth/organization/register",
        formData
      );
      console.log(response.data);
      Alert.alert("Success", "Organization registered successfully!");
      navigation.navigate("OrgLog");
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert(
        "Error",
        error.response?.data.message || "Registration failed"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0} // Adjust the offset if necessary
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Organization Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Organization Name"
          placeholderTextColor="#aaa"
          value={formData.orgName}
          onChangeText={(value) => handleChange("orgName", value)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Registration Number"
          placeholderTextColor="#aaa"
          value={formData.orgRegistration}
          onChangeText={(value) => handleChange("orgRegistration", value)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Person"
          placeholderTextColor="#aaa"
          value={formData.contactPerson}
          onChangeText={(value) => handleChange("contactPerson", value)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#aaa"
          value={formData.location}
          onChangeText={(value) => handleChange("location", value)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#aaa"
          value={formData.phoneNumber}
          onChangeText={(value) => handleChange("phoneNumber", value)}
          required
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  button: {
    backgroundColor: "#1f5184",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrgSignScreen;
