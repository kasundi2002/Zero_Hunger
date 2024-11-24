import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const OrgProfilePage = () => {
  const [orgDetails, setOrgDetails] = useState({
    orgName: "",
    registrationNumber: "",
    contactPerson: "",
    email: "",
    phoneNumber: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigation = useNavigation(); // Use the navigation hook

  useEffect(() => {
    const fetchOrgDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Retrieve token from AsyncStorage

        if (!token) {
          Alert.alert("Error", "No token found. Please log in again.");
          return;
        }

        // API request to get the organization's profile data
        const response = await axios.get(
          "http://192.168.8.169:5000/api/auth/organization/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in request headers
            },
          }
        );

        setOrgDetails(response.data); // Set organization details
        setLoading(false); // Set loading to false once data is retrieved
      } catch (error) {
        console.error("Error fetching organization details", error);
        Alert.alert("Error", "Could not fetch organization details.");
      }
    };

    fetchOrgDetails();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      // API request to update the organization's profile data
      await axios.put(
        "http://172.20.10.11:5000/api/auth/organization/profile",
        orgDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        }
      );

      Alert.alert("Success", "Profile updated successfully");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating profile", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Clear token from AsyncStorage
      Alert.alert("Logged Out", "You have been logged out successfully.");
      navigation.navigate('Loginselect'); // Navigate to the LoginSelect screen
    } catch (error) {
      console.error("Error during logout", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Organization Profile</Text>

      <Text style={styles.label}>Organization Name</Text>
      <TextInput
        style={styles.input}
        value={orgDetails.orgName}
        onChangeText={(text) => setOrgDetails({ ...orgDetails, orgName: text })}
        editable={isEditing}
      />

      <Text style={styles.label}>Registration Number</Text>
      <TextInput
        style={styles.input}
        value={orgDetails.registrationNumber}
        onChangeText={(text) =>
          setOrgDetails({ ...orgDetails, registrationNumber: text })
        }
        editable={isEditing}
      />

      <Text style={styles.label}>Contact Person</Text>
      <TextInput
        style={styles.input}
        value={orgDetails.contactPerson}
        onChangeText={(text) =>
          setOrgDetails({ ...orgDetails, contactPerson: text })
        }
        editable={isEditing}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={orgDetails.email}
        onChangeText={(text) => setOrgDetails({ ...orgDetails, email: text })}
        editable={isEditing}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={orgDetails.phoneNumber}
        onChangeText={(text) =>
          setOrgDetails({ ...orgDetails, phoneNumber: text })
        }
        editable={isEditing}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={orgDetails.location}
        onChangeText={(text) =>
          setOrgDetails({ ...orgDetails, location: text })
        }
        editable={isEditing}
      />

      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#E1F5FE", // Light blue background
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0288D1", // Dark blue color
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#0288D1", // Teal color for labels
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#81D4FA", // Teal border for input
    backgroundColor: "#FFFFFF", // White background for input
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: "#00796B", // Teal color for Edit button
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#0288D1", // Blue color for Save button
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#FF5252", // Red color for Logout button
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20, // Add some margin to separate from other buttons
  },
  buttonText: {
    color: "#FFFFFF", // White text for buttons
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1F5FE",
  },
  loadingText: {
    fontSize: 20,
    color: "#0288D1",
  },
});

export default OrgProfilePage;
