import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup"; // Import Yup for validation

const FoodNeeds = ({ navigation }) => {
  const [formData, setFormData] = useState({
    foodItem: "",
    people: "",
    requiredDate: "",
  });

  const [orgData, setOrgData] = useState({
    orgName: "",
    contactPerson: "",
    location: "",
  });

  const [errorMessages, setErrorMessages] = useState({});

  const schema = Yup.object().shape({
    foodItem: Yup.string().required("Food item is required"),
    people: Yup.number()
      .typeError("Must be a number")
      .required("Number of people is required"),
    requiredDate: Yup.date().required("Required date is required"),
  });

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Error", "No token found, unable to fetch hotel details");
          return;
        }

        const response = await axios.get(
          "http://192.168.8.169:5000/api/auth/organization/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          const { orgName, contactPerson, location } = response.data;
          setOrgData({ orgName, contactPerson, location });
        }
      } catch (error) {
        console.error("Error fetching organization details:", error);
        Alert.alert("Error", "Error fetching organization details");
      }
    };

    fetchOrgData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setErrorMessages({});
    try {
      await schema.validate(formData, { abortEarly: false });

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "No token found, unable to post food needs");
        return;
      }

      const response = await axios.post(
        "http://192.168.8.169:5000/api/auth/food",
        {
          ...orgData,
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        Alert.alert("Success", "Food need posted successfully");
        setFormData({ foodItem: "", people: "", requiredDate: "" });
        // Navigate with a parameter to refresh the data
        navigation.navigate("FoodManage", { refresh: true });
      } else {
        Alert.alert("Error", "Failed to post food need");
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        let validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrorMessages(validationErrors);
      } else {
        console.error("Error:", error);
        Alert.alert("Error", "Unable to post food need");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Post Food Needs</Text>

      {/* Read-only hotel details */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={orgData.orgName}
          placeholder="Organization Name"
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={orgData.contactPerson}
          placeholder="Owner Name"
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={orgData.location}
          placeholder="Address"
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            errorMessages.foodItem ? styles.errorInput : null,
          ]}
          placeholder="Food Item"
          placeholderTextColor="#aaa"
          value={formData.foodItem}
          onChangeText={(value) => handleChange("foodItem", value)}
        />
        {errorMessages.foodItem && (
          <Text style={styles.errorText}>{errorMessages.foodItem}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            errorMessages.people ? styles.errorInput : null,
          ]}
          placeholder="Number of People to feed"
          placeholderTextColor="#aaa"
          value={formData.people}
          onChangeText={(value) => handleChange("people", value)}
          keyboardType="numeric"
        />
        {errorMessages.people && (
          <Text style={styles.errorText}>{errorMessages.people}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            errorMessages.requiredDate ? styles.errorInput : null,
          ]}
          placeholder="Required Date (e.g., 2024-10-10)"
          placeholderTextColor="#aaa"
          value={formData.requiredDate}
          onChangeText={(value) => handleChange("requiredDate", value)}
        />
        {errorMessages.requiredDate && (
          <Text style={styles.errorText}>{errorMessages.requiredDate}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#7dadb9",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    color: "#333",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#1f5184",
    paddingVertical: 15,
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

export default FoodNeeds;
