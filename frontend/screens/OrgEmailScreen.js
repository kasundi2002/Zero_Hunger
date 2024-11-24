import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const OrgEmailScreen = ({ route }) => {
  const { orgName } = route.params;

  // State to handle images and descriptions
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of images and descriptions
  const slides = [
    {
      image:
        "https://www.foodfromtheheart.sg/images/uploads/Food-from-the-Heart-clean-plate-campaign.jpg",
      description: "Helping feed the needy by reducing food wastage.",
    },
    {
      image: "https://www.leaders-mena.com/leaders/uploads/2024/07/Hunger.png",
      description: "Join the fight against hunger by contributing excess food.",
    },
    {
      image:
        "https://www.wfpusa.org/wp-content/uploads/2020/04/1_Bn5byGcZ3xuyh-ETX4MQcQ.jpeg",
      description: "Together, we can end food insecurity one meal at a time.",
    },
  ];

  // Effect to change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Top left corner - logo and app name */}
        <View style={styles.topLeft}>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/68/7d/ed/687dedbb44330094705fe031b63b8efa.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.appName}>Zero Hunger</Text>
        </View>

        {/* Top right corner - welcome message */}
        <View style={styles.topRight}>
          <Text style={styles.welcomeText}>Welcome, {orgName}</Text>
        </View>

        {/* Center content - rotating images and descriptions */}
        <Image
          source={{ uri: slides[currentIndex].image }}
          style={styles.image}
        />
        <Text style={styles.description}>
          {slides[currentIndex].description}
        </Text>

        {/* Motives of the app */}
        <View style={styles.motivesBox}>
          <Text style={styles.motivesTitle}>Our Motives</Text>
          <View style={styles.motiveItem}>
            <Text style={styles.motiveIcon}>🍽️</Text>
            <Text style={styles.motiveText}>
              Reduce food wastage by redistributing excess food.
            </Text>
          </View>
          <View style={styles.motiveItem}>
            <Text style={styles.motiveIcon}>🤝</Text>
            <Text style={styles.motiveText}>
              Help feed the needy and fight hunger.
            </Text>
          </View>
          <View style={styles.motiveItem}>
            <Text style={styles.motiveIcon}>🌍</Text>
            <Text style={styles.motiveText}>
              Build a community that supports food security.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start", // Content starts at the top
    alignItems: "center",
  },
  container: {
    padding: 16,
    width: "100%", // Ensure the content takes full width
  },
  topLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // Add margin to give breathing space
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "red",
  },
  topRight: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 16,
    color: "black",
    marginBottom: 40, // Increased margin for more space above motives
  },
  motivesBox: {
    width: "100%",
    backgroundColor: "#f0f8ff", // Light blue background
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 30,
    marginTop: 20, // Ensure there's space between the bottom and next content
  },
  motivesTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50", // Dark blue color for the title
    textAlign: "center",
  },
  motiveItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  motiveIcon: {
    fontSize: 24,
    marginRight: 10, // Space between icon and text
  },
  motiveText: {
    fontSize: 18,
    color: "#34495e",
    flex: 1,
  },
});

export default OrgEmailScreen;
