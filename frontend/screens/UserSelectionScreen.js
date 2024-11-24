import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width: screenWidth } = Dimensions.get("window");

const UserSelectionScreen = ({ navigation }) => {
  const carouselRef = useRef(null);
  const entries = [
    {
      title: "Organization",
      description: "Sign in as an organization to manage food needs.",
      navigationPage: "OrgLog", // Your Organization Login Page
      icon: "business", // Icon for Organization
    },
    {
      title: "Hotel",
      description: "Sign in as a hotel to donate excess food.",
      navigationPage: "LogIn", // Your Hotel Login Page
      icon: "restaurant", // Icon for Hotel
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Ionicons
        name={item.icon}
        size={60}
        color="#FFFFFF"
        style={styles.icon}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(item.navigationPage)}
      >
        <Text style={styles.buttonText}>Sign In as {item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={entries}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1F5FE", // Light blue background
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    backgroundColor: "#81D4FA", // Teal background for slides
    borderRadius: 10,
    height: 300,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E88E5", // Darker blue for title
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF", // White for description
    marginVertical: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#009688", // Teal for button
    padding: 15,
    borderRadius: 5,
    width: "80%", // Adjust button width
  },
  buttonText: {
    color: "#FFFFFF", // White for button text
    fontSize: 16,
    textAlign: "center",
  },
});

export default UserSelectionScreen;
