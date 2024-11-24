import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Loginselect"); // Replace 'Home' with your home screen name
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splash.jpg")} // Use relative path
        style={styles.image}
        resizeMode="cover" // Or "contain" based on your image
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color
  },
  image: {
    width: "100%", // Full width
    height: "100%", // Full height
  },
});

export default SplashScreen;
