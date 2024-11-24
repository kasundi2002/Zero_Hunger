import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";

const DonateFood = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [donations, setDonations] = useState([]);

  const handleDonate = async () => {
    if (!donationAmount) {
      Alert.alert("Error", "Please enter a donation amount");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/donations", {
        amount: donationAmount,
      });
      // Assuming the response returns the updated donations list
      setDonations(response.data);
      setDonationAmount(""); // Reset the input field
      Alert.alert("Success", "Thank you for your donation!");
    } catch (error) {
      console.log("Error making donation", error);
      Alert.alert(
        "Error",
        "There was an issue with your donation. Please try again."
      );
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:8000/donations");
      setDonations(response.data);
    } catch (error) {
      console.log("Error fetching donations", error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <Text style={styles.header}>Donate for Food</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter donation amount"
        keyboardType="numeric"
        value={donationAmount}
        onChangeText={setDonationAmount}
      />
      <Pressable onPress={handleDonate} style={styles.donateButton}>
        <Text style={styles.buttonText}>Donate</Text>
      </Pressable>

      <Text style={styles.donationsHeader}>Recent Donations:</Text>
      <View style={styles.donationsList}>
        {donations.map((donation, index) => (
          <Text key={index} style={styles.donationItem}>
            ${donation.amount} donated
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  donateButton: {
    backgroundColor: "#4b6cb7",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  donationsHeader: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: "bold",
  },
  donationsList: {
    marginTop: 10,
  },
  donationItem: {
    fontSize: 16,
    marginBottom: 5,
    color: "gray",
  },
});

export default DonateFood;
